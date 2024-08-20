import React, { useState } from 'react';
import './TaskEditor.css';


const TaskEditor = ({ task, categories, onSave, onCancel }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [category, setCategory] = useState(task?.category || 'N/A');
    const [priority, setPriority] = useState(task?.priority || 'Normal');
    const [tags, setTags] = useState(task?.tags || []);
    const [processRate, setProcessRate] = useState(task?.processRate || 0);
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [details, setDetails] = useState(task?.details || '');
    const [subTasks, setSubTasks] = useState(task?.subTasks || []);

    const handleSave = () => {
        const updatedTask = { title, category, priority, tags, processRate, dueDate, details, subTasks };
        onSave(updatedTask);
    };

    const addSubTask = () => setSubTasks([...subTasks, { title: '', dueDate: '' }]);
    const updateSubTask = (index, key, value) => {
        const updatedSubTasks = subTasks.map((subTask, i) => (
            i === index ? { ...subTask, [key]: value } : subTask
        ));
        setSubTasks(updatedSubTasks);
    };
    const removeSubTask = (index) => setSubTasks(subTasks.filter((_, i) => i !== index));

    return (
        <div className="task-editor">
            <h3>Edit Task</h3>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title" />

            <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
            </select>

            <div>
                <input type="text" placeholder="Tag" onKeyDown={e => {
                    if (e.key === 'Enter' && e.target.value) {
                        setTags([...tags, e.target.value]);
                        e.target.value = '';
                    }
                }} />
                <div>{tags.map(tag => <span key={tag}>{tag} <button onClick={() => setTags(tags.filter(t => t !== tag))}>x</button></span>)}</div>
            </div>

            <input type="range" min="0" max="100" value={processRate} onChange={e => setProcessRate(e.target.value)} />
            <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />

            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Task Details"></textarea>

            <h4>Sub-tasks</h4>
            {subTasks.map((subTask, index) => (
                <div key={index}>
                    <input type="text" value={subTask.title} onChange={e => updateSubTask(index, 'title', e.target.value)} placeholder="Sub-task Title" />
                    <input type="datetime-local" value={subTask.dueDate} onChange={e => updateSubTask(index, 'dueDate', e.target.value)} />
                    <button onClick={() => removeSubTask(index)}>Delete</button>
                </div>
            ))}
            <button onClick={addSubTask}>+ New sub-task</button>

            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default TaskEditor;