import React from 'react';
import './TrashBin.css';


const TrashBin = ({ tasks, onDelete, onRecover }) => {
    return (
        <div className="trash-bin">
            <h3>Trash Bin</h3>
            <input type="text" placeholder="Search in trash bin..." onChange={e => console.log(e.target.value)} />

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" />
                        <span>{task.title}</span>
                        <span>{task.dueDate}</span>
                        <button onClick={() => onRecover(task)}>Recover</button>
                        <button onClick={() => onDelete(task)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => console.log('Select all')}>Select all</button>
            <button onClick={() => console.log('Deselect all')}>Deselect all</button>
            <button onClick={() => console.log('Delete selected')}>Delete selected</button>
            <button onClick={() => console.log('Recover selected')}>Recover selected</button>
        </div>
    );
};

export default TrashBin;