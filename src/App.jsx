import React, {useState, useRef, useEffect} from "react";
import {v4 as uuidv4 } from "uuid"
import {TodoList} from './Components/TodoList';



export function App(){

    const [ state, setState] = useState([{
        id: 1,
        task: "Tarea de prueba",
        completed: false,
    }]);

    const todoTaskRef = useRef();

    useEffect(()=>{localStorage.setItem('todoApp.todos')}, [todos])

    const toggleTodo = (id)=> {
        const newTodos =[...state];
        const todo = newTodos.find((todo)=>todo.id===id);
        todo.completed = !todo.completed;
        setState(newTodos)
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "") return;

        setState((prev)=>{
            return [...prev, {id: uuidv4(), task, completed: false}]
        })

        todoTaskRef.current.value = null
    }

    const handleClearAll = () => {
        const newTodos = state.filter((todo)=> !todo.completed);
        setState(newTodos)
    }

    return (
        <>
        <TodoList todos={state} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
        <button onClick = {handleTodoAdd}>+</button>
        <button onClick = {handleClearAll}>quit</button>
        <div>Quedan {state.filter((todo)=>!todo.completed).length} tareas</div>
        </>
    )
}