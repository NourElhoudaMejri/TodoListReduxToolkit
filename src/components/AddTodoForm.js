import {useDispatch} from "react-redux";
import {addTodosAsync} from "../redux/todoSlice";
import React, {useState} from "react";

const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
 
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(value)
        if (value) {
            dispatch(
                // addTodo({
                //     title: value
                // })

                addTodosAsync({
                    title: value
                })

            )
        }
    };
    return (
        <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
            <label className='sr-only'>Nom</label>
            <input
                type='text'
                className='form-control mb-2 mr-sm-2'
                placeholder='Ajouter todo...'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            ></input>
            <button type='submit' className='btn btn-primary mb-2'>
                Ajouter
            </button>
        </form>
    );
};
export default AddTodoForm;