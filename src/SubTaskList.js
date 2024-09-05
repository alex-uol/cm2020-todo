import React from "react";

/**
 * SubTaskList Component
 * Renders a list of sub-tasks.
 *
 * @param {Object} props
 * @param {Object[]} props.subTasks - List of sub-task objects.
 * @returns {JSX.Element} A rendered sub-task list.
 */

const SubTaskList = ({ subTasks }) => {
  return (
    <ul className="sub-task-list">
      {subTasks &&
        subTasks.length > 0 &&
        subTasks.map((subTask) => <li key={subTask.id}>{subTask.title}</li>)}
    </ul>
  );
};

export default SubTaskList;
