import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import useTasks from '../hooks/useTasks';
import useFilter from '../hooks/useFilter';

/**
 * TaskManagement - A comprehensive task management component with CRUD operations.
 * 
 * @description This component provides a complete task management interface including
 * search functionality, filtering by status, inline editing, and localStorage persistence.
 * Features include accessibility support, error handling, and performance optimizations.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Array<Object>} [props.initialTasks=[]] - Initial array of task objects
 * @param {number} props.initialTasks[].id - Unique identifier for the task
 * @param {string} props.initialTasks[].description - The task description/title
 * @param {boolean} props.initialTasks[].completed - Whether the task is completed
 * 
 * @returns {JSX.Element} The rendered TaskManagement component
 */

export default function TaskManagement({ initialTasks }) {
  
  // State management
  const { tasks, addTask, editTask, deleteTask, toggleComplete } = useTasks(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [error, setError] = useState('');

  // Refs
  const textAreaRef = useRef(null);
  const editInputRef = useRef(null);

  // Auto-focus edit input when editing starts
  useEffect(() => {
    if (editingTaskId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingTaskId]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Filter tasks based on search term and status
  const filteredTasks = useFilter(tasks, filterStatus, searchTerm);

  /**
   * Displays an error message to the user.
   * 
   * @param {string} message - The error message to display
   * @returns {void}
   */
  const showError = (message) => {
    setError(message);
  };

  /**
   * Handles search input changes and updates the search term.
   * 
   * @param {string} term - The search term entered by the user
   * @returns {void}
   */
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  /**
   * Handles filter status changes (All, Active, Completed).
   * 
   * @param {string} status - The filter status selected by the user
   * @returns {void}
   */
  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
  }, []);

  /**
   * Handles toggling the completion status of a task with error handling.
   * 
   * @param {number} id - The unique ID of the task to toggle
   * @returns {void}
   */
  const handleCompleteTask = useCallback((id) => {
    try {
      toggleComplete(id);
    } catch (err) {
      showError('Failed to update task status ' + err);
    }
  }, [toggleComplete]);

  /**
   * Handles adding a new task from form submission or Enter key press.
   * Supports both button click and keyboard submission.
   * 
   * @param {Event} e - The form submission or keyboard event
   * @returns {void}
   */
  const handleAddTask = useCallback((e) => {
    e.preventDefault();
    try {
      let description = '';
      if (e.key === 'Enter' && !e.shiftKey) {
        description = e.target.value.trim();
      }
      if (e.type === 'click' || e.type === 'submit') {
        description = textAreaRef.current?.value.trim() || '';
      }

      if (!description) {
        showError('Task description cannot be empty');
        return;
      }

      if (!addTask(description)) {
        showError('Task already exists or description is empty');
        return;
      }

      // Clear textarea and reset error
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
        textAreaRef.current.focus();
      }
      setError('');
    } catch (err) {
      showError('Failed to add task ' + err);
    }
  }, [addTask]);

  /**
   * Handles deleting a task with error handling.
   * 
   * @param {number} id - The unique ID of the task to delete
   * @returns {void}
   */
  const handleDeleteTask = useCallback((id) => {
    try {
      deleteTask(id);
    } catch (err) {
      showError('Failed to delete task' + err);
    }
  }, [deleteTask]);

  /**
   * Initiates editing mode for a specific task.
   * Sets the task ID and populates the edit form with current description.
   * 
   * @param {Object} task - The task object to edit
   * @param {number} task.id - The task ID
   * @param {string} task.description - The current task description
   * @returns {void}
   */
  const handleEditClick = useCallback((task) => {
    setEditingTaskId(task.id);
    setEditedDescription(task.description);
    setError('');
  }, []);

  /**
   * Handles changes to the edit input field.
   * 
   * @param {Event} e - The input change event
   * @returns {void}
   */
  const handleEditChange = useCallback((e) => {
    setEditedDescription(e.target.value);
  }, []);

  /**
   * Saves the edited task description with validation and error handling.
   * 
   * @param {number} taskId - The ID of the task being edited
   * @returns {void}
   */
  const handleEditSave = useCallback((taskId) => {
    try {
      const trimmedDescription = editedDescription.trim();
      if (!trimmedDescription) {
        showError('Task description cannot be empty');
        return;
      }

      editTask(taskId, trimmedDescription);
      setEditingTaskId(null);
      setEditedDescription('');
      setError('');
    } catch (err) {
      showError('Failed to save task changes' + err);
    }
  }, [editTask, editedDescription]);

  /**
   * Cancels the editing operation and resets the edit state.
   * 
   * @returns {void}
   */
  const handleEditCancel = useCallback(() => {
    setEditingTaskId(null);
    setEditedDescription('');
    setError('');
  }, []);

  /**
   * Handles keyboard shortcuts during task editing.
   * Enter key saves changes, Escape key cancels editing.
   * 
   * @param {KeyboardEvent} e - The keyboard event
   * @param {number} taskId - The ID of the task being edited
   * @returns {void}
   */
  const handleEditKeyDown = useCallback((e, taskId) => {
    if (e.key === 'Enter') {
      handleEditSave(taskId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  }, [handleEditSave, handleEditCancel]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">✅ Task Management</h1>
        <p className="text-slate-600 mt-2">Manage Your Tasks Efficiently</p>
      </header>

      {/* Error Message */}
      {error && (
        <div 
          className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-center gap-3"
          role="alert"
          aria-live="polite"
        >
          <span className="text-2xl">⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Search Section */}
      <section className="mb-8">
        <div className="bg-white border-2 border-slate-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
          <label className="block font-semibold text-slate-700 mb-3 flex items-center gap-2" htmlFor="searchTasks">
            <span>🔍</span> Search Tasks
          </label>
          <input
            id="searchTasks"
            type="text"
            placeholder="Type to search tasks..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border-2 border-slate-300 focus:border-slate-500 focus:ring-slate-500 focus:ring-2 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
            aria-describedby="search-help"
          />
          <p id="search-help" className="text-sm text-slate-500 mt-2 flex items-center gap-1">
            <span>💡</span> Search by task description
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <fieldset className="mb-6">
        <legend className="font-medium text-gray-700 mb-3">Filter Tasks</legend>
        <div className="flex flex-wrap gap-4">
          {['All', 'Active', 'Completed'].map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="filter"
                value={status}
                checked={filterStatus === status}
                onChange={() => handleFilterChange(status)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Task List */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Tasks ({filteredTasks.length})
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks found</p>
            {searchTerm && (
              <p className="text-sm">Try adjusting your search or filter</p>
            )}
          </div>
        ) : (
          <ul className="space-y-3" role="list">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-white rounded p-4 shadow hover:shadow-md transition-shadow"
              >
                {editingTaskId === task.id ? (
                  <div className="flex-1 flex gap-2 items-center">
                    <label htmlFor={`edit-task-${task.id}`} className="sr-only">
                      Edit task description
                    </label>
                    <input
                      id={`edit-task-${task.id}`}
                      ref={editInputRef}
                      type="text"
                      value={editedDescription}
                      onChange={handleEditChange}
                      onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                      className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Edit task description"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(task.id)}
                        className="px-3 py-1 text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                        aria-label="Save changes"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                        aria-label="Cancel editing"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleCompleteTask(task.id)}
                          className="sr-only"
                          aria-label={`Mark task "${task.description}" as ${task.completed ? 'incomplete' : 'complete'}`}
                        />
                        <span
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                            task.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                          aria-hidden="true"
                        >
                          {task.completed && '✓'}
                        </span>
                      </label>
                      <span
                        className={`${
                          task.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        } transition-colors`}
                      >
                        {task.description}
                      </span>
                    </div>
                    <div className="flex gap-2 ml-3">
                      <button
                        onClick={() => handleEditClick(task)}
                        disabled={editingTaskId !== null}
                        className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        aria-label={`Edit task "${task.description}"`}
                      >
                        <span aria-hidden="true">✏️</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg transition-all duration-200"
                        aria-label={`Delete task "${task.description}"`}
                      >
                        <span aria-hidden="true">🗑️</span>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Task Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add New Task</h2>
        <form onSubmit={handleAddTask} className="space-y-3">
          <div>
            <label htmlFor="new-task" className="block font-medium text-gray-700 mb-2">
              Task Description
            </label>
            <textarea
              id="new-task"
              ref={textAreaRef}
              placeholder="Describe your new task..."
              className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleAddTask(e);
                }
              }}
              aria-describedby="task-help"
            />
            <p id="task-help" className="text-sm text-gray-500 mt-1">
              Press Enter to add task, Shift+Enter for new line
            </p>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✨</span> Add Task
          </button>
        </form>
        <p className="text-gray-500 text-center mt-4 text-sm">
          Tasks are automatically saved to local storage
        </p>
      </section>
    </div>
  );
}

// PropTypes for type checking
TaskManagement.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

TaskManagement.defaultProps = {
  initialTasks: [],
};