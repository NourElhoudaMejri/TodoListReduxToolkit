import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const resp= await fetch('http://localhost:8060/todos');
        if(resp){
            const todos = await resp.json()

            return {todos}
        }
    }
)

export const addTodosAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8060/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: payload.title}),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return {todo};
        }
    }
);
export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8060/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({completed: payload.completed}),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return {todo};
        }
    }
);
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8060/todos/${payload.id}`, {
            method: 'DELETE',
            
        });

        if (resp.ok) {
            return {id: payload.id};
        }
    }
);


export const todoSlice =  createSlice({
    name: 'todos',
    initialState: [
        {id:1, title:'todo1', completed:false,isUpdated: false},
        {id:2, title:'todo2 ',completed:false,isUpdated: false},
        {id:3, title:'todo3', completed:true,isUpdated: false},
        {id:4, title:'todo4', completed:false,isUpdated: false},
        {id:5, title:'todo5', completed:false,isUpdated: false}

    ], 
    reducers: {


         addTodo: (state, action) => {
            const todo= {
                id: new Date(),
                title: action.payload.title,
                completed: false,
                isUpdated: false
            };
            state.push(todo)
        } ,

        toggleComplete: (state, action) => {
           // console.log(action.payload)
            const index = state.findIndex((todo) => todo.id === action.payload.id);
           // console.log(index)
            state[index].completed = action.payload.completed;
        },

        deleteTodo: (state, action) => {
       //return state.filter((todo) => 
       // todo.id !== action.payload.id)
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index > -1) {
            state.splice(index, 1);
        }
        return state;
        },

        ModifTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
             console.log('modif')
        
             state[index].isUpdated = true;
        },
        ValidModifTodo: (state, action)=> {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
             
             state[index].title = action.payload.title;
             state[index].isUpdated = false;

        },
    },


    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos
        },
    
        [addTodosAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.todo.id
            );
            state[index].completed = action.payload.todo.completed;
        },
   
        [deleteTodoAsync.fulfilled]: (state, action) => {
            console.log('heee')
            const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index > -1) {
                    state.splice(index, 1);
                }
                return state;        }


    }
        
})
export const {addTodo, toggleComplete,deleteTodo,ModifTodo, ValidModifTodo} = todoSlice.actions;
export default todoSlice.reducer;