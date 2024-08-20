import React from 'react';
import './TaskList.css';


const TaskList = ({ tasks, onTaskClick }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item" onClick={() => onTaskClick(task)}>
                    <h3>{task.title}</h3>
                    <p>Category: {task.category}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Tags: {task.tags.join(', ')}</p>
                    <p>Due: {task.dueDate}</p>
                    <p>Progress: {task.processRate}%</p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;