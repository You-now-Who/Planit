import React from 'react';

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  const handleToggleCompleted = () => {
    onToggleCompleted(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);    
  };

  return (
    <li className="flex items-center py-2">
      <input
        type="checkbox"
        className="mr-4"
        checked={todo.completed}
        onChange={handleToggleCompleted}
      />
      <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
        {todo.text}
      </span>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteTodo}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
