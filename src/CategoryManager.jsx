import React, { useState } from 'react';
import './CategoryManager.css';


const CategoryManager = ({ categories, onAddCategory, onDeleteCategory }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            onAddCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    return (
        <div className="category-manager">
            <h3>Manage Categories</h3>
            <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Category name..." />
            <button onClick={handleAddCategory}>Add Category</button>

            <ul>
                {categories.map(category => (
                    <li key={category}>
                        #{category}
                        <button onClick={() => onDeleteCategory(category)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;