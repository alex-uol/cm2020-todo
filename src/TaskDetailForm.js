import React, { useState, useEffect } from 'react';

function TaskDetailForm({ task, addTask, saveTask, markComplete, goBack }) {
  const initialTaskState = {
    title: '',
    description: '',
    subTasks: [],
    dueDate: '',
    priority: 'medium',
    completed: false,
  };
  const [currentTask, setCurrentTask] = useState(task || initialTaskState);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
    } else {
      setCurrentTask(initialTaskState);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleAddSubTask = () => {
    setCurrentTask(prev => ({
      ...prev,
      subTasks: [...prev.subTasks, { id: Date.now(), title: '', description: '' }]
    }));
    setHasChanges(true);
  };

  const handleSubTaskChange = (index, e) => {
    const newSubTasks = [...currentTask.subTasks];
    newSubTasks[index][e.target.name] = e.target.value;
    setCurrentTask(prev => ({ ...prev, subTasks: newSubTasks }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (currentTask.title.trim() === '') {
      alert('Title is required.');
      return;
    }
    if (currentTask.id) {
      saveTask(currentTask);
    } else {
      addTask({ ...currentTask, id: Date.now() });
    }
    setHasChanges(false);
  };

  const handleMarkComplete = () => {
    markComplete(currentTask.id);
  };

  return (
    <div className="task-detail-form">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <p className="task-detail-form-task-title">Task Title</p>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={currentTask.title}
        onChange={handleChange}
        required
      />
      <p className="task-detail-form-task-description">Task Description</p>
      <textarea
        name="description"
        placeholder="Description"
        value={currentTask.description}
        onChange={handleChange}
      />
      <p className="task-detail-form-task-dueDate">Task Due Date</p>
      <input
        type="date"
        name="dueDate"
        value={currentTask.dueDate}
        onChange={handleChange}
      />
      <div>
        <label>Priority:</label>
        <input
          type="radio"
          name="priority"
          value="low"
          checked={currentTask.priority === 'low'}
          onChange={handleChange}
        /> Low
        <input
          type="radio"
          name="priority"
          value="medium"
          checked={currentTask.priority === 'medium'}
          onChange={handleChange}
        /> Medium
        <input
          type="radio"
          name="priority"
          value="high"
          checked={currentTask.priority === 'high'}
          onChange={handleChange}
        /> High
      </div>

      <h3>Sub-Tasks</h3>
      {currentTask.subTasks.map((subTask, index) => (
        <div key={subTask.id}>
          <strong>SubTask {index + 1}</strong>
          <input
            type="text"
            name="title"
            placeholder="Sub-Task Title"
            value={subTask.title}
            onChange={(e) => handleSubTaskChange(index, e)}
          />
          <p>Sub-Task description:</p>
          <textarea
            name="description"
            placeholder="Sub-Task Description"
            value={subTask.description}
            onChange={(e) => handleSubTaskChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleAddSubTask}>Add Sub-Task</button>

      <button onClick={handleSave}>Save Task</button>
      {task && !task.completed && <button onClick={handleMarkComplete}>Mark as Completed</button>}
      <button onClick={() => goBack(hasChanges)}>Back to Tasks</button>
    </div>
  );
}

export default TaskDetailForm;