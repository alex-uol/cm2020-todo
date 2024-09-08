import React from "react";

/**
 * TaskTags Component
 * Renders tags associated with a task.
 *
 * @param {Object} props
 * @param {Object[]} props.tags - List of all tags in Tasks
 * @param {number[]} props.tagIds - Array of tag IDs to render.
 * @returns {JSX.Element} A rendered tags container.
 */

const TaskTags = ({ tags, tagIds }) => {
  return (
    <div className="tasklist-tags-container">
      {tagIds &&
        tagIds.length > 0 &&
        tagIds.map((tagId) => {
          const tag = tags.find((tag) => tag.id == tagId);
          return tag ? (
            <div>
              <span
                className="tag-colour-block"
                key={tag.id}
                style={{ backgroundColor: tag.colour }}
              ></span>
              <strong>{"#" + tag.name}</strong>
            </div>
          ) : null;
        })}
    </div>
  );
};

export default TaskTags;
