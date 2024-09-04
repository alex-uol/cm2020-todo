import React, { useState }  from 'react';
import { Status, Task, Priority } from './Task';
import { Category, Tag } from './Category';
import { useNavigate } from "react-router-dom";

import SearchBox from './SearchBox';
import TaskItem from './TaskItem';

/**
 * @param {Object} param0 
 * @param {Task[]} param0.tasks list of 
 * @param {Function} param0.selectTask
 * @param {Function} param0.moveToTrash
 * @param {Function} param0.markComplete
 * @param {Function} param0.restoreTask
 * @param {Function} param0.deleteTaskPermanently
 * @param {Category[]} param0.categories list of categories
 * @param {Tag[]} param0.tags list of tags
 * @returns {React.JSX.Element}
 */
function TaskList({ 
  tasks, 
  setSelectedTaskId, 
  moveToTrash, 
  markComplete, 
  restoreTask, 
  deleteTaskPermanently, 
  categories, 
  tags 
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSeaching] = useState(false);
  const navigate = useNavigate();
  /**now time for comparing with due date of tasks*/
  const today = new Date().toISOString().split('T')[0];
  const [sortOption, setSortOption] = useState("unsorted");
  const [filterStatus, setFilterStatus] = useState('all');

  /**  Filter tasks based on search and status */
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch =
      searchValue === "" ||
      task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.description.toLowerCase().includes(searchValue.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  /** select a task and navigate to task editing page
   * @param {Task} task 
   */
  const selectTask = (task) => {
    if (task.status !== Status.trashed)
    {
      setSelectedTaskId(task.id);
      navigate("/task");
    }
  }

  /** render the tasklist */
  const renderTasks = (tasks) => {
    return (
      <ul className="tasklist">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selectTask={()=>selectTask(task)}
            markComplete={markComplete}
            restoreTask={restoreTask}
            moveToTrash={moveToTrash}
            deleteTaskPermanently={deleteTaskPermanently}
            tags={tags}
          />
        ))}
      </ul>
    );
  };

  const heading = filterStatus === 'all' ? 'All Tasks' : filterStatus + ' Tasks';


  const sortedTasks = () => {
    switch (sortOption) {
      case "byCategory":
        return renderTasksByGroup(sortTasksByCategory(filteredTasks), categories, "category");
      case "byTags":
        return renderTasksByGroup(sortTasksByTags(filteredTasks), tags, "tag");
      case "byPriority":
        return renderTasksByPriority(sortTasksByPriority(filteredTasks));
      case "bySubTasks":
        return renderTasksbySubTasks(sortTasksBySubTasks(filteredTasks));
      default:
        return renderTasks(filteredTasks);
    }
  };

  // Function to render grouped tasks by category or tags
  const renderTasksByGroup = (groupedTasks, groupArray, groupType) => {
    return Array.from(groupedTasks.entries()).map(([groupId, tasks]) => {
      const group = groupArray.find((group) => group.id == groupId);

      return (
        <div key={groupId}>
          {groupType === "category" && group && <div><strong>{`Category: ${group.title}`}</strong></div>}
          {groupType === "tag" && group && <div><strong>{`Tag: ${group.name}`}</strong></div>}
          {renderTasks(tasks)}
        </div>
      );
    });
  };


  // Function to render grouped tasks by priority
  const renderTasksByPriority = (tasksByPriority) => {
    return (
      <div>
        <h3>High Priority</h3>
        {renderTasks(tasksByPriority[Priority.high])}
        <h3>Medium Priority</h3>
        {renderTasks(tasksByPriority[Priority.medium])}
        <h3>Low Priority</h3>
        {renderTasks(tasksByPriority[Priority.low])}
      </div>
    );
  };

  // Function to render grouped tasks by priority
  const renderTasksbySubTasks = (tasksBySubTasks) => {
    const { withSubTasks, withoutSubTasks } = tasksBySubTasks;
    return (
      <div>
        <h3>Tasks with Sub-Tasks</h3>
        {renderTasks(withSubTasks)}
        <h3>Tasks without Sub-Tasks</h3>
        {renderTasks(withoutSubTasks)}
      </div>
    );
  };

  // Functions to sort tasks by priority
  const sortTasksByPriority = (filteredTasks) => {
    const tasksByPriority = {
      [Priority.high]: [],
      [Priority.medium]: [],
      [Priority.low]: [],
    };
  
    filteredTasks.forEach((task) => {
      tasksByPriority[task.priority].push(task);
    });
  
    return tasksByPriority;
  };

  const sortTasksBySubTasks = (filteredTasks) => {
    const tasksWithSubTasks = [];
    const tasksWithoutSubTasks = [];
  
    filteredTasks.forEach((task) => {
      if (task.subTasks.length > 0) {
        tasksWithSubTasks.push(task);
      } else {
        tasksWithoutSubTasks.push(task);
      }
    });
  
    return {
      withSubTasks: tasksWithSubTasks,
      withoutSubTasks: tasksWithoutSubTasks,
    };
  };

  // Function to sort the tasks by category
  const sortTasksByCategory = (tasks) => {
    
    // create an empty map
    const tasksByCategory = new Map();

    // set the default category
    tasksByCategory.set(parseInt(-1), []);

    tasks.forEach((task) => {
      const categoryId = task.category;

      // If not yet created, create a new category group by categoryId
      if (!tasksByCategory.has(categoryId)) {
        tasksByCategory.set(categoryId, []);
      }
      // Push the current task into the array associated with its category 
      tasksByCategory.get(categoryId).push(task);
    });
    
    return tasksByCategory;
  };

  // Function to sort the tasks by tags
  const sortTasksByTags = (tasks) => {
    
    // create an empty map
    const tasksByTag = new Map();

    // set the default tags for tasks without a tag
    tasksByTag.set(parseInt(-1), []);

    tasks.forEach((task) => {
      // For a task without a tag
      if (task.tags.length === 0) {
        tasksByTag.get(parseInt(-1)).push(task);
      } 
      // For a task with tags
      else 
      {
        task.tags.forEach((tagId) => {
          
          if (!tasksByTag.has(tagId)) {
            tasksByTag.set(tagId, []);
          }
  
          tasksByTag.get(tagId).push(task);
        });
      }
    });

    return tasksByTag;
  };


  // const sortTasksByPriority = (tasks) => {
  //   return [...tasks].sort((a, b) => {
  //     const priorityOrder = [Priority.high, Priority.medium, Priority.low];
  //     return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
  //   });
  // };

  // Functions to sort tasks by tasks with subtasks
  // const sortTasksBySubTasks = (tasks) => {
  //   return tasks.filter(task => task.subTasks.length > 0);
  // };

  return (
    <div className="task-list">
      <div className="header-container">
        <h2>{heading}</h2>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilterStatus('all')}>Show All</button>
        {filterStatus !== Status.completed && <button onClick={() => setFilterStatus(Status.completed/*'completed'*/)}>Show Completed</button>}
        {filterStatus !== Status.active && <button onClick={() => setFilterStatus(Status.active/*'uncompleted'*/)}>Show Uncompleted</button>}
        {filterStatus !== Status.trashed && <button onClick={() => setFilterStatus(Status.trashed/*'trashed'*/)}>Show Trashed</button>}
      </div>

      {/* Sorting buttons */}
      <div className="sorting-buttons">
        <button className={sortOption == "unsorted" ? "active" : ""} onClick={() => setSortOption("unsorted")}>Unsorted</button>
        <button className={sortOption == "byCategory" ? "active" : ""} onClick={() => setSortOption("byCategory")}>Sort by Category</button>
        <button className={sortOption == "byTags" ? "active" : ""} onClick={() => setSortOption("byTags")}>Sort by Tags</button>
        <button className={sortOption == "byPriority" ? "active" : ""} onClick={() => setSortOption("byPriority")}>Sort by Priority</button>
        <button className={sortOption == "bySubTasks" ? "active" : ""} onClick={() => setSortOption("bySubTasks")}>Sort Tasks with Sub-Tasks</button>
      </div>
      <div>
        {sortedTasks()}
      </div>
    </div>
  );
}

export default TaskList;
