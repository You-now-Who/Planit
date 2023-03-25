import React, { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { v4 as uuid } from 'uuid';

const STORAGE_KEY = 'nextjs-todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: uuid(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form
        className="flex mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.elements.todoInput;
          handleAddTodo(input.value);
          input.value = '';
        }}
      >
        <input
          type="text"
          name="todoInput"
          className="flex-1 border border-gray-400 rounded py-2 px-4 mr-2"
          placeholder="Enter a new todo item"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </form>
      {todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <ul className="list-disc pl-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleCompleted={handleToggleCompleted}
              onDeleteTodo={handleDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
