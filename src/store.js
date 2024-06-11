// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/TodoSlices';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
