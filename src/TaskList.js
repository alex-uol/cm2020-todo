import React from 'react';

function TaskList({ tasks, selectTask, moveToTrash, markComplete, restoreTask, deleteTaskPermanently, filterStatus, setFilterStatus }) {
  const today = new Date().toISOString().split('T')[0];

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

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'completed') return task.status === 'completed';
    if (filterStatus === 'uncompleted') return task.status === 'active';
    if (filterStatus === 'trashed') return task.status === 'trashed';
    return true;
  });

  const heading = filterStatus === 'all' ? 'All Tasks' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1) + ' Tasks';

  return (
    <div className="task-list">
      <h2>{heading}</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilterStatus('all')}>Show All</button>
        {filterStatus !== 'completed' && <button onClick={() => setFilterStatus('completed')}>Show Completed</button>}
        {filterStatus !== 'uncompleted' && <button onClick={() => setFilterStatus('uncompleted')}>Show Uncompleted</button>}
        {filterStatus !== 'trashed' && <button onClick={() => setFilterStatus('trashed')}>Show Trashed</button>}
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={`${task.dueDate < today ? 'overdue' : ''} ${task.status === 'active' ? 'active' : ''} ${task.status === 'trashed' ? 'trashed' : ''}`}>
            <div onClick={() => task.status !== 'trashed' && selectTask(task.id)}>
              <strong>{task.title}</strong> - {task.description}
              <div>Priority: {task.priority}</div>
              <div>Due Date: {task.dueDate ? task.dueDate : "Not yet set"} {task.dueDate ? (calculateRemainingTime(task.dueDate)) : ""}</div>
              <div>Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
              {task.subTasks && task.subTasks.length > 0 && (
                <ul>
                  {task.subTasks.map(subTask => (
                    <li key={subTask.id}>{subTask.title}</li>
                  ))}
                </ul>
              )}
            </div>
            {task.status === 'active' && <button onClick={() => markComplete(task.id)}>Mark Completed</button>}
            {task.status === 'completed' && <button onClick={() => restoreTask(task.id)}>Mark Uncomplete</button>}
            {task.status !== 'trashed' && <button onClick={() => moveToTrash(task.id)}>Delete</button>}
            {task.status === 'trashed' && <button onClick={() => deleteTaskPermanently(task.id)}>Delete Permanently</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;