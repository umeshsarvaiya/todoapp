// src/features/todos/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getUserTodos = (userId) => {
    return JSON.parse(localStorage.getItem(`todos-${userId}`)) || [];
};
const setUserTodos = (userId, todos) => {
    localStorage.setItem(`todos-${userId}`, JSON.stringify(todos));
};
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        userId: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload;
            state.todos = getUserTodos(action.payload);
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            setUserTodos(state.userId, state.todos);
        },
        editTodo: (state, action) => {
            const { id, name } = action.payload;
            const existingTodo = state.todos.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.name = name;
                setUserTodos(state.userId, state.todos);
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            setUserTodos(state.userId, state.todos);
        },
    },
});

export const { setUser, addTodo, editTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
