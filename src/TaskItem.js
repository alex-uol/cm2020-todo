import React from 'react';
import { Status } from './Task';
import SubTaskList from './SubTaskList';
import TaskTags from './TaskTags';

/**
 * TaskItem Component
 * Renders a single task with its details, tags, and action buttons.
 * 
 * @param {Object} props
 * @param {Object} props.task - The task object to render.
 * @param {Function} props.selectTask - Function to select a task for editing.
 * @param {Function} props.markComplete - Function to mark a task as completed.
 * @param {Function} props.restoreTask - Function to mark a completed task as uncompleted.
 * @param {Function} props.moveToTrash - Function to move a task to the trash.
 * @param {Function} props.deleteTaskPermanently - Function to delete a task permanently.
 * @param {Object[]} props.tags - List of all tags to render associated tags.
 * @returns {JSX.Element} A rendered task item.
 */
const TaskItem = ({ task, selectTask, markComplete, restoreTask, moveToTrash, deleteTaskPermanently, tags }) => {

  /**now time for comparing with due date of tasks*/
  const today = new Date().toISOString().split('T')[0];

   /**calculate remaining time from due date 
   * @param {string} dueDate due date of task
   * @returns {string} remaining time in plain text from
  */
  const calculateRemainingTime = (dueDate) => {
    
    const due = new Date(dueDate);
    const now = new Date();today
    const diffMs = due - now;

    if (diffMs <= 0) return 'Overdue';
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day(s) remaining`;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hour(s) remaining`;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute(s) remaining`;
  };

  const getClassName = () => {
    if (task.dueDate !== "" && task.dueDate < today) {
      return "overdue";
    }
    if (task.status === Status.active || task.status === Status.trashed) {
      return task.status;
    }
    return "";
  };

  return (
    <li className={getClassName()} key={task.id}>
      <div onClick={() => task.status !== Status.trashed && selectTask(task.id)}>
        <strong>{task.title}</strong> - {task.description}
        <div>Priority: {task.priority}</div>
        <div>Due Date: {task.dueDate ? task.dueDate : "Not yet set"} {task.dueDate ? calculateRemainingTime(task.dueDate) : ""}</div>
        <div>Status: {task.status}</div>

        <SubTaskList subTasks={task.subTasks} />
      </div>

      <TaskTags tags={tags} tagIds={task.tags} />
      
      <div>
        {task.status === Status.active && <button onClick={() => markComplete(task.id)}>Mark Completed</button>}
        {task.status === Status.completed && <button onClick={() => restoreTask(task.id)}>Mark Uncomplete</button>}
        {task.status !== Status.trashed && <button onClick={() => moveToTrash(task.id)}>Delete</button>}
        {task.status === Status.trashed && <button onClick={() => deleteTaskPermanently(task.id)}>Delete Permanently</button>}
      </div>
    </li>
  );
};

export default TaskItem;
