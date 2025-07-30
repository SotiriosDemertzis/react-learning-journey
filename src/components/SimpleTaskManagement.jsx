/* eslint-disable no-unused-vars */
import { useState,useRef } from "react";
import PropTypes from "prop-types";
import useFilter from "../hooks/useFilter";
import useTasks from "../hooks/useTasks";

export default function SimpleTaskManagement({ initialTasks }) {
  const { tasks, addTask, editTask, deleteTask, toggleComplete } =
    useTasks(initialTasks);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useFilter(tasks, filterStatus, searchTerm);
  const textAreaRef = useRef(null);

  const handleAddTask = () => {
    const description = textAreaRef.current.value;

    if (!description) {
      alert("Empty description");
      return;
    }

    if (!addTask(description)) {
      alert(`Task with description: ${description} already exists`);
    }
    textAreaRef.current.value = "";
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) textAreaRef.current.value = taskToEdit.description;
    deleteTask(taskToEdit.id);
  };

  return (
    <div className="App">
      <label>Search Task</label>
      <input
        type="text"
        placeholder="Type Task description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>Filter Tasks</h2>
      {["All", "Active", "Completed"].map((status) => (
        <span key={status} style={{ marginRight: "15px" }}>
          <label>{status}</label>
          <input
            type="radio"
            name="filterStatus"
            value={status}
            checked={filterStatus === status}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </span>
      ))}
      {filteredTasks.length == 0 && <p>No Tasks Found</p>}
      <ol>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              name={task.description}
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <label>{task.description}</label>
            <button
              style={{ "margin-left": "10px" }}
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <button
              style={{ "margin-left": "10px" }}
              onClick={() => handleEdit(task.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ol>
      <h2>Add Task</h2>
      <textarea
        name="taskarea"
        ref={textAreaRef}
        cols="40"
        placeholder="Type the task description"
      ></textarea>
      <button onClick={() => handleAddTask(textAreaRef.current.value.trim())}>
        Add Task
      </button>
    </div>
  );
}

SimpleTaskManagement.propTypes = {
    initialTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
  };

  SimpleTaskManagement.defaultProps = {
    initialTasks: [],
  };
