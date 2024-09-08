import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import "../../css/kanban.css"
import { Category } from '../../models/Category';
import { Task } from '../../models/Task';
/**
 * CategoryManager Component
 * Manages a list of categories with functionalities to create, edit, and delete categories.
 *
 * @param {Object} props
 * @param {Category[]} props.categories - List of all categories.
 * @param {Task[]} props.tasks - List of all categories.
 * @param {Function} props.updateTaskCategory - Function to update a category of task.
 * @returns {React.JSX.Element}
 * 
*/

export function CategoryKanban({ categories, tasks, updateTaskCategory }) {
    let initialData = {
        columns: {},
        columnOrder:[],
        tasks:{}
    }
    
    for (let category of categories) {
        const { id, title } = category;
        initialData.columnOrder.push(id);
        let categoryTasks = tasks.filter((task) => { return task.category == id; });
        let taskIds = categoryTasks.map(task => task.id);
        initialData.columns[id] = { id, title, taskIds }
    }
    for (let task of tasks) {
        const { id, title } = task;
        initialData.tasks[id] = { id, content: title }
    }

    const [data, setData] = useState(initialData);


    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startColumn = data.columns[source.droppableId];
        const endColumn = data.columns[destination.droppableId];

        // If task is moved to a different category
        if (startColumn !== endColumn) {
            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStartColumn = {
                ...startColumn,
                taskIds: startTaskIds,
            };

            const endTaskIds = Array.from(endColumn.taskIds);
            endTaskIds.splice(destination.index, 0, draggableId);
            const newEndColumn = {
                ...endColumn,
                taskIds: endTaskIds,
            };

            setData({
                ...data,
                columns: {
                    ...data.columns,
                    [newStartColumn.id]: newStartColumn,
                    [newEndColumn.id]: newEndColumn,
                },
            });
            
            updateTaskCategory(draggableId, destination.droppableId);
        }
        
    };

    return (
        <div className="board">
            <DragDropContext onDragEnd={onDragEnd}>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                    return (
                        <div className='column-container'>
                            <h3>{column.title}</h3>
                            <hr />
                            <Droppable key={column.id} droppableId={column.id.toString()}>
                                {(provided) => (
                                    <div
                                        className="column"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className="task-container">
                                            {tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                    {(provided) => (

                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="task"
                                                        >
                                                            {task.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );

                })}
            </DragDropContext>
        </div>
    );
};



