import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormTodo from './presentation/todo-form';
import TodoList from './presentation/todo-list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<TodoList />} />
        <Route path='/form-todo' element={<FormTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
