import React, { useState } from "react";
import { Category } from "../../models/Category";
import SearchBox from "../SearchBox";
import "../../css/tabs.css";
import { Task } from "../../models/Task";
import { CategoryKanban } from "./CategoryKanban";

/**
 * CategoryManager Component
 * Manages a list of categories with functionalities to create, edit, and delete categories.
 *
 * @param {Object} props
 * @param {Category[]} props.categories - List of all categories.
 * @param {Task[]} props.tasks - List of all tasks.
 * @param {Function} props.updateCategory - Function to update a category.
 * @param {Function} props.createCategory - Function to create a new category.
 * @param {Function} props.deleteCategory - Function to delete a category.
 * @param {Function} props.updateTaskCategory - Function to delete a category.
 * @returns {React.JSX.Element}
 */
export function CategoryManager({
  categories,
  tasks,
  updateCategory,
  createCategory,
  deleteCategory,
  updateTaskCategory,
}) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setEditingCategory(null); // Clear editing state when searching
  };

  const filteredCategories = !searchValue
    ? categories
    : categories.filter((category) =>
        category.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (category) => {
    if (!category.title.trim()) {
      alert("Title of a category cannot be empty.");
      return;
    }

    if (category.id === -1) {
      createCategory(category);
    } else {
      updateCategory(category);
    }

    setEditingCategory(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleDeleteCategory = (category) => {
    const msg =
      "You are going to delete category " +
      category.title +
      ".\r\nThis will reset category field for all tasks in this category." +
      "\r\nAre you willing to do this?";
    if (window.confirm(msg)) {
      deleteCategory(category);
    }
  };

  const renderCategoryItem = (category) => (
    <div className="list-item" key={category.id}>
      <div>
        <strong>{"*" + category.title}</strong>
      </div>
      <div>
        <button onClick={() => handleEditCategory(category)}>Edit</button>
        <button
          className="warning"
          onClick={() => handleDeleteCategory(category)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const renderEditingCategory = () => (
    <div className="list-item" key={editingCategory.id}>
      <input
        type="text"
        name="title"
        value={editingCategory.title}
        onChange={(e) =>
          setEditingCategory({ ...editingCategory, title: e.target.value })
        }
      />
      <div>
        <button onClick={handleCancelEdit}>Cancel</button>
        <button onClick={() => handleSaveCategory(editingCategory)}>
          Save
        </button>
      </div>
    </div>
  );

  const handleNewCategory = () => {
    setEditingCategory(new Category());
  };

  const [currentTab, setCurrentTab] = useState("listView");
  const setViewValue = (value) => {
    setCurrentTab(value);
  };

  return (
    <div className="category-manager">
      <div className="header-container">
        <h2>Category Manager</h2>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={handleSearchChange}
        />
      </div>

      <div style={{ marginBottom: "5px" }}>
        <button onClick={handleNewCategory} disabled={!!editingCategory}>
          + New Category
        </button>
      </div>

      <div className="tab">
        <button
          className="tab-links"
          onClick={() => {
            setViewValue("listView");
          }}
        >
          List
        </button>
        <button
          className="tab-links"
          onClick={() => {
            setViewValue("gridView");
          }}
        >
          Grid
        </button>
      </div>

      <div
        id="listView"
        style={{ display: currentTab == "listView" ? "block" : "none" }}
        className="tab-content"
      >
        <div>
          {editingCategory &&
            editingCategory.id === -1 &&
            renderEditingCategory()}
          {filteredCategories.map((category) =>
            editingCategory && editingCategory.id === category.id
              ? renderEditingCategory()
              : renderCategoryItem(category),
          )}
        </div>
      </div>

      <div
        id="gridView"
        className="tab-content"
        style={{ display: currentTab == "gridView" ? "block" : "none" }}
      >
        <CategoryKanban
          categories={categories}
          tasks={tasks}
          updateTaskCategory={updateTaskCategory}
        />
      </div>
    </div>
  );
}
