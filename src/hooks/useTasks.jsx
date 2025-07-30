import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom React hook for managing a list of tasks with CRUD operations and localStorage persistence.
 * 
 * @description This hook provides a complete task management system with create, read, update, 
 * and delete operations. All tasks are automatically persisted to localStorage and synchronized
 * across browser tabs. The hook uses performance optimizations to prevent unnecessary re-renders.
 * 
 * @param {Array<Object>} initialTasks - Initial array of task objects to populate the tasks list
 * @param {number} initialTasks[].id - Unique identifier for the task
 * @param {string} initialTasks[].description - The task description/title
 * @param {boolean} initialTasks[].completed - Whether the task is completed or not
 * 
 * @returns {Object} Task management interface
 * @returns {Array<Object>} returns.tasks - Current array of all tasks
 * @returns {Function} returns.addTask - Function to add a new task
 * @returns {Function} returns.editTask - Function to edit an existing task's description
 * @returns {Function} returns.deleteTask - Function to delete a task by ID
 * @returns {Function} returns.toggleComplete - Function to toggle a task's completion status
 * @returns {Function} returns.setTasks - Direct setter function for advanced use cases
 * 
 */

export default function useTasks(initialTasks) {
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);

/*
 * useCallback Dependency Rule:
 * 
 * SIMPLE RULE: If you use a variable from outside the callback INSIDE the callback,
 * you MUST include it in the dependency array.
 * Why? React needs to know about ALL external variables to guarantee
 * the callback works correctly, even if some variables (like setTasks) 
 * never actually change.
 */

  /**
   * Adds a new task to the tasks list.
   * 
   * @param {string} description - The description/title for the new task
   * @returns {boolean} true if task was added successfully, false if description is empty or duplicate exists
   */

  const addTask = useCallback((description) => {
    if (!description.trim()) return false;
    if (tasks.some(task => task.description.toLowerCase() === description.trim().toLowerCase())) {
      return false; // Duplicate
    }
    const newTask = { id: Date.now(), description: description.trim(), completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
    return true;
  }, [tasks, setTasks]);

  /**
   * Edits the description of an existing task.
   * 
   * @param {number} id - The unique ID of the task to edit
   * @param {string} newDescription - The new description for the task
   * @returns {void}
   */
  const editTask = useCallback((id, newDescription) => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  }, [setTasks]);

  /**
   * Deletes a task from the tasks list.
   * 
   * @param {number} id - The unique ID of the task to delete
   * @returns {void}
   */
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  /**
   * Toggles the completion status of a task.
   * 
   * @param {number} id - The unique ID of the task to toggle
   * @returns {void}
   */
  const toggleComplete = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    setTasks,
  };
}