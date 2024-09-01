import React, { useState }  from 'react';
import { Status, Task } from './Task';
import { Category, Tag } from './Category';
import { useNavigate } from "react-router-dom";

/**
 * @param {Object} param0 
 * @param {Task[]} param0.tasks list of 
 * @param {Function} param0.selectTask
 * @param {Function} param0.moveToTrash
 * @param {Function} param0.markComplete
 * @param {Function} param0.restoreTask
 * @param {Function} param0.deleteTaskPermanently
 * @param {Number | null} param0.filterStatus filter tasks with status value or show all tasks if null
 * @param {Function} param0.setFilterStatus
 * @param {Category[]} param0.categories list of categories
 * @param {Tag[]} param0.tags list of tags
 * @returns {React.JSX.Element}
 */
function TaskList({ tasks, selectTask, moveToTrash, markComplete, restoreTask, deleteTaskPermanently, filterStatus, setFilterStatus, categories, tags }) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSeaching] = useState(false);
  const navigate = useNavigate();

  /**now time for comparing with due date of tasks*/
  const today = new Date().toISOString().split('T')[0];

  /**calculate remaining time from due date 
   * @param {string} dueDate due date of task
   * @returns {string} remaining time in plain text from
  */
  const calculateRemainingTime = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffMs = due - now;

    if (diffMs <= 0) return 'Overdue';
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day(s) remaining`;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hour(s) remaining`;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute(s) remaining`;
  };

  /**filtered tasks*/
  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== "all")
    {
      return task.status === filterStatus;
    }
    return true;
  });

  const heading = filterStatus === 'all' ? 'All Tasks' : filterStatus + ' Tasks';



  /**
   * @param {Task} task 
   * @returns {React.JSX.Element}
   */
  function drawTask(task)
  {
    function getClassName()
    {
      if (task.dueDate != "" && task.dueDate < today)
      {
        return "overdue";
      }
      if (task.status == Status.active || task.status === Status.trashed)
      {
        return task.status;
      }
      return "";
    }

    /**draws list of tags of this task
     * @returns {React.JSX.Element[]}
    */
    function drawTags()
    {
      let jsx = [];
      for (let i = 0; i < task.tags.length; i++)
      {
        const _tag = tags.find((e)=>e.id == task.tags[i]);
        jsx.push(
          <div className="tag-container" key={_tag.id} style={{backgroundColor : _tag.colour}}>{_tag.name}</div>
        );
      }
      return jsx;
    }

    const redirectToTask = () =>
    {
      if (task.status !== Status.trashed)
      {
        selectTask(task.id);
        navigate("/task");
      }
    }

    return (
    <li className={getClassName()} key={task.id}>
      <div onClick={redirectToTask}>
        <strong>{task.title}</strong> - {task.description}
        <div>Priority: {task.priority}</div>
        <div>Due Date: {task.dueDate ? task.dueDate : "Not yet set"} {task.dueDate ? (calculateRemainingTime(task.dueDate)) : ""}</div>
        <div>Status: {task.status}</div>
        {task.subTasks && task.subTasks.length > 0 && (
          <ul>
            {task.subTasks.map(subTask => (
              <li key={subTask.id}>{subTask.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="tasklist-tags-container">
        {drawTags()}
      </div>
      <div>
        {task.status === Status.active && <button onClick={() => markComplete(task.id)}>Mark Completed</button>}
        {task.status === Status.completed && <button onClick={() => restoreTask(task.id)}>Mark Uncomplete</button>}
        {task.status !== Status.trashed && <button onClick={() => moveToTrash(task.id)}>Delete</button>}
        {task.status === Status.trashed && <button onClick={() => deleteTaskPermanently(task.id)}>Delete Permanently</button>}
      </div>
    </li>)
  }

  /**
   * @param {number} catId category id
   * @returns 
   */
  function drawCategoryHeader(catId)
  {
    let _cat = categories.find((e)=>e.id == catId);
    if (_cat === undefined)
    {
      return (
        <div key={-1}><strong>Common</strong></div>
      )
    }
    else
    {
      return (
        <div key={catId}><strong>{"#" + _cat.title}</strong></div>
      )
    }
  }

  /**draw all tasks */
  function drawTasks()
  {
    let jsx = [];
    for (let i = 0; i < filteredTasks.length; i++)
    {
      jsx.push(drawTask(filteredTasks[i]));
    }
    return jsx;
  }

  /**draw all tasks by category */
  function drawTasksByCategory()
  {
    let jsx = [];
    let _tasks = filteredTasks;
    let catId = null;
    _tasks.sort((a, b)=>{return a.category - b.category})

    for (let i = 0; i < _tasks.length; i++)
    {
      if (isSearching)
      {
        if(filteredTasks[i].title.search(searchValue) == -1 &&
          filteredTasks[i].description.search(searchValue) == -1)
        {
          continue;
        }
      }
      if (catId !== _tasks[i].category)
      {
        catId = _tasks[i].category;
        jsx.push(drawCategoryHeader(catId));
      }
      jsx.push(drawTask(_tasks[i]));
    }
    return jsx;
  }

  /** draw search box
    * @returns {React.JSX.Element}
    */
  function drawSearchBox()
  {
    function OnSearchBoxChange(e)
    {
      if (e.target.value == "" && isSearching)
      {
        setIsSeaching(false);
      }
      setSearchValue(e.target.value);
    }

    return (
      <div className="search-box">
        <input
          type="text"
          name="searchValue"
          placeholder="Search a category..."
          value={searchValue}
          onChange={(e)=>OnSearchBoxChange(e)}>
        </input>
        <button
          onClick={()=>setIsSeaching(true)}
        >Search</button>
      </div>
    )
  }

  return (
    <div className="task-list">
      <div className="header-container">
        <h2>{heading}</h2>
        <div></div>
        {drawSearchBox()}
        <div></div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilterStatus('all')}>Show All</button>
        {filterStatus !== Status.completed && <button onClick={() => setFilterStatus(Status.completed/*'completed'*/)}>Show Completed</button>}
        {filterStatus !== Status.active && <button onClick={() => setFilterStatus(Status.active/*'uncompleted'*/)}>Show Uncompleted</button>}
        {filterStatus !== Status.trashed && <button onClick={() => setFilterStatus(Status.trashed/*'trashed'*/)}>Show Trashed</button>}
      </div>
      <ul>
        {drawTasksByCategory()}
      </ul>
    </div>
  );
}

export default TaskList;