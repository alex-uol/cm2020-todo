import React, { useState } from 'react';
import Navigation from './Navigation';
import TaskList from './TaskList';
import TaskEditor from './TaskEditor';
import TrashBin from './TrashBin';
import CategoryManager from './CategoryManager';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState(['Work', 'Personal', 'Health', 'Shopping']);
    const [selectedCategory, setSelectedCategory] = useState('All tasks');
    const [editingTask, setEditingTask] = useState(null);
    const [showTaskEditor, setShowTaskEditor] = useState(false);
    const [showTrashBin, setShowTrashBin] = useState(false);

    return (
        <div className="app-container">
            <Navigation
                categories={categories}
                onCategoryClick={setSelectedCategory}
                onFilterClick={setSelectedCategory}
                onNewTask={() => setShowTaskEditor(true)}
            />
            {showTaskEditor ? (
                <TaskEditor
                    task={editingTask}
                    categories={categories}
                    onSave={(task) => {
                        setTasks([...tasks, task]);
                        setShowTaskEditor(false);
                    }}
                    onCancel={() => setShowTaskEditor(false)}
                />
            ) : showTrashBin ? (
                <TrashBin
                    tasks={tasks.filter(task => task.isDeleted)}
                    onDelete={(task) => setTasks(tasks.filter(t => t !== task))}
                    onRecover={(task) => {
                        task.isDeleted = false;
                        setTasks([...tasks]);
                    }}
                />
            ) : (
                <TaskList
                    tasks={tasks.filter(task => task.category === selectedCategory || selectedCategory === 'All tasks')}
                    onTaskClick={setEditingTask}
                />
            )}
        </div>
    );
};

export default App;

