// TaskListFilter.js
import React from 'react';

/**
 * TaskListFilter Component
 * Renders buttons for filtering the task list by status.
 * 
 * @param {Object} props
 * @param {Function} props.setFilterStatus - Function to set the filter status.
 * @returns {JSX.Element} A rendered filter buttons component.
 */
const TaskListFilter = ({ setFilterStatus }) => (
  <div className="task-list-filter">
    <button onClick={() => setFilterStatus("all")}>All</button>
    <button onClick={() => setFilterStatus("active")}>Active</button>
    <button onClick={() => setFilterStatus("completed")}>Completed</button>
    <button onClick={() => setFilterStatus("trashed")}>Trashed</button>
  </div>
);

export default TaskListFilter;
