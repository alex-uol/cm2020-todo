import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import TaskList from './TaskList';
import TaskDetailForm from './TaskDetailForm';

import { CategoryManager } from './CategoryManager';
import { Status, Task } from './Task';
import { Category, Tag } from './Category';
import { TagManager } from './TagManager.js';
import DataManagement from './DataManagement'
import ResetApp from './ResetApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  /**@deprecated use useNavigate to navigate to another page*/
  const [context, setContext] = useState('list');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadData()
  }, []);

  const loadData = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories);
    const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
    setTags(savedTags);
  };


  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks);
  };

  const addTask = (task) => {
    saveTasks([...tasks, { ...task, status: Status.active, id: Date.now() }]);
    if (task.category != -1)
    {
      let cat = categories.find((e)=>e.id == task.category);
      cat = {...cat, tasks: [...cat.tasks, task.id]};
      updateCategory(cat);
    }
    //setContext('list');
  };

  const saveTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    saveTasks(updatedTasks);
  };

  const markComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: Status.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const moveToTrash = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: Status.trashed } : task
    );
    saveTasks(updatedTasks);
  };

  const restoreTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: Status.active } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTaskPermanently = (id) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  /**saves category list to storage 
   * @param {Category[]} categories
  */
  const saveCategories = (categories) =>
  {
    localStorage.setItem('categories', JSON.stringify(categories));
    setCategories(categories);
  }

  /**insert a new category into list 
   * @param {Category} category 
  */
  const createCategory = (category) =>
  {
    //saveCategories([...categories, { ...category, id: parseInt(categories.length)}]);
    let newId = 0;
    for (let i = 0; i < categories.length; i++)
    {
      if (categories[i].id >= newId)
      {
        newId = categories[i].id + 1;
      }
    }
    saveCategories([...categories, { ...category, id: newId}]);
  }

  /**update information of a category in list 
   * @param {Category} category 
  */
  const updateCategory = (category) =>
  {
    const newCategories = categories.map(e => e.id.toString() == category.id.toString() ? category : e);
    saveCategories(newCategories);
  }

  /**delete a category from list, removes(not delete) all tasks in the category
   * @param {Category} category 
  */
  const deleteCategory = (category) =>
  {
    const newTasks = tasks.map(e => e.category.toString() == category.id.toString() ? {...e, category: -1} : e);
    saveTasks(newTasks);
    const newCategories = categories.filter(e => e.id !== category.id); 
    saveCategories(newCategories); 
  }

  /**saves tag list to storage 
   * @param {Tag[]} tags 
  */
  const saveTags = (tags) =>
  {
    localStorage.setItem('tags', JSON.stringify(tags));
    setTags(tags);
  }

  /**insert a new tag into list 
   * @param {Tag} tag
  */
  const createTag = (tag) =>
  {
    let newId = 0;
    for (let i = 0; i < tags.length; i++)
    {
      if (tags[i].id >= newId)
      {
        newId = tags[i].id + 1;
      }
    }
    saveTags([...tags, { ...tag, id: newId}]);
  }

  /**update information of a tag in list 
   * @param {Tag} tag
  */
  const updateTag = (tag) =>
  {
    const newTags = tags.map(e => e.id.toString() == tag.id.toString() ? tag : e);
    saveTags(newTags);
  }

  /**delete a tag from list, removes this tag for all tasks with it 
   * @param {Tag} tag
  */
  const deleteTag = (tag) =>
  {
    let _tasks = tasks;
    for (let i = 0; i < _tasks.length; i++)
    {
      for (let j = 0; j < _tasks[i].tags.length; j++)
      {
        if (_tasks[i].tags[j].toString() == tag.id.toString())
        {
          _tasks[i].tags.splice(j, 1);
        }
      }
    }
    saveTasks(_tasks);
    const newTags = categories.filter(e => e.id !== tag.id); 
    saveTags(newTags); 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={
            <TaskList 
              tasks={tasks} 
              setSelectedTaskId={setSelectedTaskId} 
              moveToTrash={moveToTrash} 
              markComplete={markComplete} 
              restoreTask={restoreTask} 
              deleteTaskPermanently={deleteTaskPermanently} 
              categories={categories}
              tags={tags}
            />
          }/>
          <Route path="/task" element={
            <TaskDetailForm
              task={selectedTask? selectedTask : null /*context === 'create' ? null : selectedTask*/}
              addTask={addTask}
              saveTask={saveTask}
              markComplete={markComplete}
              categories={categories}
              tags={tags}
              setSelectedTaskId={setSelectedTaskId}
            />
            
          }/>
          <Route path="/categorieManager" element={
            <CategoryManager 
              categories={categories} 
              updateCategory={updateCategory} 
              createCategory={createCategory}
              deleteCategory={deleteCategory}
            />
          }/>
          <Route path="/tagManager" element={
            <TagManager 
              tags={tags} 
              updateTag={updateTag} 
              createTag={createTag}
              deleteTag={deleteTag}
            />
          }/>
          <Route path="/dataManagement" element={
            <DataManagement onImport={loadData} />
          }/>
          <Route path="/resetApp" element={
            <ResetApp
              setTasks={setTasks}
              setCategories={setCategories}
              setTags={setTags}
            />
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
