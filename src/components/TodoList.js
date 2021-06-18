import {useDispatch, useSelector} from "react-redux";
import TodoItem from "./TodoItem";
import React, {useEffect} from "react";
import {getTodosAsync} from "../redux/todoSlice";

const TodoList = () => {
    const todos = useSelector ((state=> state.todos))
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    return (
        <ul className={'list-group'}>
            {todos.map((todo) => (
                <li className={`list-group-item ${todo.completed && 'list-group-item-success'}`}
                    key={todo.id}>
                    <TodoItem
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        isUpdated= {todo.isUpdated}>
                    </TodoItem>
                </li>
            ))}

        </ul>
    )
};

export default TodoList;