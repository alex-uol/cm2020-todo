import React from 'react';
import './Navigation.css';

const Navigation = ({ categories, onCategoryClick, onFilterClick, onNewTask }) => {
    return (
        <div className="navigation">
            <div className="user-info">
                <p>User Name</p>
                <button onClick={() => console.log('Go to settings')}>⚙️</button>
            </div>

            <div className="task-filters">
                <h3>Tasks</h3>
                <ul>
                    {['All tasks', 'Today', 'Recently', 'Important', 'Trash Bin'].map(filter => (
                        <li key={filter} onClick={() => onFilterClick(filter)}>
                            {filter}
                        </li>
                    ))}
                </ul>
                <button onClick={onNewTask}>+ New Task</button>
            </div>

            <div className="categories">
                <h3>Categories</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category} onClick={() => onCategoryClick(category)}>
                            #{category}
                        </li>
                    ))}
                </ul>
                <button onClick={() => console.log('Create new category')}>+ New Category</button>
            </div>
        </div>
    );
};

export default Navigation;