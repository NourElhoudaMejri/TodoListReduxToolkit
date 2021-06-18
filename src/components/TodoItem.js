import {useDispatch} from "react-redux";
import {toggleComplete, deleteTodo,toggleCompleteAsync,deleteTodoAsync,ModifTodo, ValidModifTodo} from "../redux/todoSlice";
import React, {useState} from "react";
const TodoItem = ({ id, title, completed,isUpdated}) => {

const dispatch = useDispatch();

const  handleClick = () => {
    // dispatch(toggleComplete({
    //      id,
    //      completed: !completed 
    //     }));
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
};
const handleDeleteClick = () => {
    //dispatch(deleteTodo({id}));
    dispatch(deleteTodoAsync({id} ))
};

const [newTitle, setnewTitle] = useState(title);
const handleModifClick = () => {

        dispatch(
            ModifTodo({
               id, isUpdated
            })
    )
}


const handleValidClick = (e) => {
    console.log(newTitle);
        dispatch(
            ValidModifTodo({
               id, 
               title: newTitle
            })
    )
}
    return (
            <div className='d-flex justify-content-between'>
				{ !isUpdated ? 
                <>
                <span className='d-flex align-items-center'>
					<input
                        type='checkbox'
                        className='mr-3'
                        defaultChecked={completed}
                        onClick={handleClick}
                    ></input>
                    {title}
				</span> 
                <button onClick={handleModifClick} className='btn btn-danger'>
                    Modifier
                </button>
                </>
                : 
            <>
            
                <input type="text" name="test" value={newTitle} onChange={(e)=>{setnewTitle(e.target.value)}}/>
                <button onClick={handleValidClick} className='btn btn-danger'>
                    Valider
                </button> 
                </>
}

                <button onClick={handleDeleteClick} className='btn btn-danger'>
                    Supprimer
                </button>
            </div>
    );
};

export default TodoItem;
