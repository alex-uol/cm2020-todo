import React, { useState, useEffect } from 'react';
import { Task, SubTask, Priority } from './Task';
import { Category, Tag } from './Category';
import { useNavigate } from 'react-router-dom';
import TaskTags from './TaskTags';

/**draw task detail form
 * @param {Object} param0 
 * @param {Task} param0.task task handled in this form
 * @param {Function} param0.addTask function inserts a new task to task list
 * @param {Function} param0.saveTask function saves an existing task to task list
 * @param {Function} param0.markComplete set a task as completed and save
 * @param {Function} param0.goBack returns to index page
 * @param {Category[]} param0.categories list of all categories
 * @param {Tag[]} param0.tags list of all tags
 * @returns {React.JSX.Element}
 */
function TaskDetailForm({ task, addTask, saveTask, markComplete, categories, tags, setSelectedTaskId }) {
  const initialTaskState = new Task();
  const [currentTask, setCurrentTask] = useState(task || initialTaskState);
  const [hasChanges, setHasChanges] = useState(false);
  const [drawTagSelector, setDrawTagSelector] = useState(false);
  const navigate = useNavigate();

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
      subTasks: [...prev.subTasks, new SubTask()]
    }))
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
      setSelectedTaskId(null);
      navigate("/");
    }
    setHasChanges(false);
  };

  const handleMarkComplete = () => {
    markComplete(currentTask.id);
  };

  const goBack = () => {
    if (hasChanges) {
      alert('Please save changes before leaving.');
    } else {
      setSelectedTaskId(null);
      navigate("/");
    }
  }

  const removeTag = (e) => {
    setCurrentTask({...currentTask, tags : currentTask.tags.filter(n=>n != e.target.value)});
  }

  const addTag = (e) => {
    const _id = parseInt(e.target.value);
    if (_id == -1)
    {
      return;
    }
    if (currentTask.tags.find(n => n == e.target.value))
    {
      return;
    }
    setCurrentTask({...currentTask, tags : [...currentTask.tags, _id]});
    setDrawTagSelector(false);
  }

  function drawCategorieSelector()
  {
    return (
      <div className="category-container">
        <div>Category</div>
        <select name="category" value={currentTask.category} onChange={handleChange}>
          <option value="-1" key="-1">(None)</option>
          {categories.map(e=>(<option value={e.id} key={e.id}>{e.title}</option>))}
        </select>
      </div>
    )
  }

  /** 
   * @returns {React.JSX.Element[]}
   */
  function drawTagsContainer()
  {
    /** 
     * @param {Tag} tag 
     * @returns {React.JSX.Element}
     */
    function drawTag(tag)
    {
      return (
        <div className="list-item" key={tag.id}>
        {/* Render a tag using TaskTags Component, change the tag.id to Array */}
        <TaskTags tags={tags} tagIds={[tag.id]} />
        <div>
            <button className="warning" value={tag.id} onClick={removeTag}>Delete</button>
        </div>
      </div>
        // <div key={e.id} className="tag-container">
        //   <div className="tag-colour-block" style={{backgroundColor: e.colour}}></div>
        //   <div>{e.name}</div>
        //   <button className="warning" value={e.id} onClick={removeTag}>Delete</button>
        // </div>
      )
    }

    /** 
     * @returns {React.JSX.Element}
     */
    function drawNewTagButton()
    {
      return (
        <div key={-1}>
          <button onClick={()=>setDrawTagSelector(true)}>+</button>
        </div>
      )
    }
    /**
     * @returns {React.JSX.Element}
     */
    function drawSelector()
    {
      return (
        <div key={-1} className="tag-container">
          <select name="tags" value={-1} onChange={addTag}>
            <option value="-1" key="-1">(None)</option>
            {tags.map(e=>(<option value={e.id} key={e.id}>{e.name}</option>))}
          </select>
          <div></div>
          <button className="warning" onClick={()=>{setDrawTagSelector(false)}}>Cancel</button>
        </div>
      )
    }

    let jsx = [];

    jsx.push(<div key={-2}>Tags:</div>)
    jsx.push(drawTagSelector? drawSelector() : drawNewTagButton());

    for (let i = 0; i < currentTask.tags.length; i++)
    {
      const _tag = tags.find(e => e.id == currentTask.tags[i])
      jsx.push(drawTag(_tag));
    }

    return jsx;
  }

  return (
    <div className="task-detail-form">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <div className="tags-container">
        {drawTagsContainer()}
      </div>
      {drawCategorieSelector()}
      <p className="task-detail-form-task-title">Task Title</p>
      <input
        className="full-width-input"
        type="text"
        name="title"
        placeholder="Title"
        value={currentTask.title}
        onChange={handleChange}
        required
      />
      <p className="task-detail-form-task-description">Task Description</p>
      <textarea
        className="full-width-input"
        name="description"
        placeholder="Description"
        value={currentTask.description}
        onChange={handleChange}
      />
      <p className="task-detail-form-task-dueDate">Task Due Date</p>
      <input
        className="full-width-input"
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
          checked = {currentTask.priority == Priority.low}
          onChange={handleChange}
        /> Low
        <input
          type="radio"
          name="priority"
          value="medium"
          checked = {currentTask.priority == Priority.medium}
          onChange={handleChange}
        /> Medium
        <input
          type="radio"
          name="priority"
          value="high"
          checked = {currentTask.priority == Priority.high}
          onChange={handleChange}
        /> High
      </div>

      <h3>Sub-Tasks</h3>
      {currentTask.subTasks.map((subTask, index) => (
        <div key={subTask.id}>
          <strong>SubTask {index + 1}</strong>
          <input
            className="full-width-input"
            type="text"
            name="title"
            placeholder="Sub-Task Title"
            value={subTask.title}
            onChange={(e) => handleSubTaskChange(index, e)}
          />
          <p>Sub-Task description:</p>
          <textarea
            className="full-width-input"
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