import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompletedItems from './components/TotalCompletedItems';

const App = () => {
    return (
        <div className='container bg-white p-4 mt-5'>
            <h1>Ma Liste Todo</h1>
            <AddTodoForm />
            <TodoList />
            <TotalCompletedItems />
        </div>
    );
};

export default App;