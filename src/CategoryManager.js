import React, { useState } from 'react';
import { Category } from './Category';
import SearchBox from './SearchBox';

/**
 * CategoryManager Component
 * Manages a list of categories with functionalities to create, edit, and delete categories.
 *
 * @param {Object} props
 * @param {Category[]} props.categories - List of all categories.
 * @param {Function} props.updateCategory - Function to update a category.
 * @param {Function} props.createCategory - Function to create a new category.
 * @param {Function} props.deleteCategory - Function to delete a category.
 * @returns {React.JSX.Element}
 */
export function CategoryManager({ categories, updateCategory, createCategory, deleteCategory }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setEditingCategory(null); // Clear editing state when searching
  };

  const filteredCategories = !searchValue
    ? categories
    : categories.filter(category =>
        category.title.toLowerCase().includes(searchValue.toLowerCase())
      );

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (category) => {
    if (!category.title.trim()) {
      alert('Title of a category cannot be empty.');
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

  const renderCategoryItem = (category) => (
    <div className="list-item" key={category.id}>
      <div><strong>{"*" + category.title}</strong></div>
      <div>
        <button onClick={() => handleEditCategory(category)}>Edit</button>
        <button className="delete" onClick={() => deleteCategory(category)}>Delete</button>
      </div>
    </div>
  );

  const renderEditingCategory = () => (
    <div className="list-item" key={editingCategory.id}>
      <input
        type="text"
        name="title"
        value={editingCategory.title}
        onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
      />
      <div>
        <button onClick={handleCancelEdit}>Cancel</button>
        <button onClick={() => handleSaveCategory(editingCategory)}>Save</button>
      </div>
    </div>
  );

  const handleNewCategory = () => {
    setEditingCategory(new Category());
  };

  return (
    <div className="category-manager">
      <div className="header-container">
        <h2>Category Manager</h2>
        <SearchBox searchValue={searchValue} setSearchValue={handleSearchChange} />
      </div>
      <div>
        <button onClick={handleNewCategory} disabled={!!editingCategory}>+ New Category</button>
      </div>
      <div>
        {editingCategory && editingCategory.id === -1 && renderEditingCategory()}
        {filteredCategories.map((category) =>
          editingCategory && editingCategory.id === category.id
            ? renderEditingCategory()
            : renderCategoryItem(category)
        )}
      </div>
    </div>
  );
}
