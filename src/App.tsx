import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormTodo from './presentation/todo-form';
import TodoList from './presentation/todo-list';
import LoginPage from './presentation/login';
import ProtectedRoute from './widgets/protected_route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<TodoList />} />
        <Route path='/form-todo' element={<ProtectedRoute><FormTodo /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
