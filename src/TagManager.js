import React, { useState } from "react";
import { Tag } from "./Category";
import SearchBox from "./SearchBox";
import TaskTags from "./TaskTags";

/**
 * TagManager Component
 * Manages a list of tags with functionalities to create, edit, and delete tags.
 *
 * @param {Object} props
 * @param {Tag[]} props.tags - List of all tags.
 * @param {Function} props.updateTag - Function to update a tag.
 * @param {Function} props.createTag - Function to create a new tag.
 * @param {Function} props.deleteTag - Function to delete a tag.
 * @returns {React.JSX.Element}
 */
export function TagManager({ tags, updateTag, createTag, deleteTag }) {
  const [editingTag, setEditingTag] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setEditingTag(null); // Clear editing state when searching
  };

  const filteredTags = !searchValue
    ? tags
    : tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchValue.toLowerCase()),
      );

  const handleEditTag = (tag) => {
    setEditingTag(tag);
  };

  const handleSaveTag = (tag) => {
    if (!tag.name.trim()) {
      alert("Name of a tag cannot be empty.");
      return;
    }

    if (tag.id === -1) {
      createTag(tag);
    } else {
      updateTag(tag);
    }

    setEditingTag(null);
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
  };

  const handleDeleteTag = (tag) => {
    const msg =
      "You are going to delete tag " +
      tag.name +
      ".\r\nThis will remove it form all tasks with this tag. " +
      "\r\nAre you willing to do this?";
    if (window.confirm(msg)) {
      deleteTag(tag);
    }
  };

  const renderTagItem = (tag) => (
    <div className="list-item" key={tag.id}>
      {/* Render a tag using TaskTags Component, change the tag.id to Array */}
      <TaskTags tags={tags} tagIds={[tag.id]} />
      <div>
        <button onClick={() => handleEditTag(tag)}>Edit</button>
        <button className="warning" onClick={() => handleDeleteTag(tag)}>
          Delete
        </button>
      </div>
    </div>
  );

  const renderEditingTag = () => (
    <div className="list-item" key={editingTag.id}>
      <input
        type="text"
        name="name"
        value={editingTag.name}
        onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
      />
      <input
        type="color"
        name="colour"
        value={editingTag.colour}
        onChange={(e) =>
          setEditingTag({ ...editingTag, colour: e.target.value })
        }
      />
      <div>
        <button onClick={handleCancelEdit}>Cancel</button>
        <button onClick={() => handleSaveTag(editingTag)}>Save</button>
      </div>
    </div>
  );

  const handleNewTag = () => {
    setEditingTag(new Tag());
  };

  return (
    <div className="tag-manager">
      <div className="header-container">
        <h2>Tag Manager</h2>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={handleSearchChange}
        />
      </div>
      <div>
        <button onClick={handleNewTag} disabled={!!editingTag}>
          + New Tag
        </button>
      </div>
      <div>
        {editingTag && editingTag.id === -1 && renderEditingTag()}
        {filteredTags.map((tag) =>
          editingTag && editingTag.id === tag.id
            ? renderEditingTag()
            : renderTagItem(tag),
        )}
      </div>
    </div>
  );
}
