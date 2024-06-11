// src/features/todo/TodoList.js
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from '../component/TodoItem';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  console.log("very happy",todos)
  localStorage.setItem(`user-todo-list`,todos[0])
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />   
      ))}
      </>
  );
};

export default memo(TodoList);
