import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import TaskList from './TaskList';
import TaskDetailForm from './TaskDetailForm';
import DataManagement from './DataManagement'

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [context, setContext] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData()
  }, []);

  const loadData = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks);
  };

  const addTask = (task) => {
    saveTasks([...tasks, { ...task, status: 'active', id: Date.now() }]);
    setContext('list');
  };

  const selectTask = (id) => {
    setSelectedTaskId(id);
    setContext('detail');
  };

  const saveTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    saveTasks(updatedTasks);
  };

  const markComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: 'completed' } : task
    );
    saveTasks(updatedTasks);
  };

  const moveToTrash = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: 'trashed' } : task
    );
    saveTasks(updatedTasks);
  };

  const restoreTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: 'active' } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTaskPermanently = (id) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="app">
      <NavBar setContext={setContext} />
      <div className="main-content">
        {context === 'list' && (
          <TaskList 
            tasks={tasks} 
            selectTask={selectTask} 
            moveToTrash={moveToTrash} 
            markComplete={markComplete} 
            restoreTask={restoreTask} 
            deleteTaskPermanently={deleteTaskPermanently} 
            filterStatus={filterStatus} 
            setFilterStatus={setFilterStatus} 
          />
        )}
        {(context === 'create' || (context === 'detail' && selectedTask)) && (
          <TaskDetailForm
            task={context === 'create' ? null : selectedTask}
            addTask={addTask}
            saveTask={saveTask}
            markComplete={markComplete}
            goBack={(hasChanges) => {
              if (hasChanges) {
                alert('Please save changes before leaving.');
              } else {
                setContext('list');
              }
            }}
          />
        )}
        {context === "dataManagement" && <DataManagement onImport={loadData} />}
      </div>
    </div>
  );
}

export default App;
