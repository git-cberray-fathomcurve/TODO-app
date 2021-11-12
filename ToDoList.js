import React from 'react'
import ToDo from './ToDo';

const ToDoList = ({todos, setTodos, filteredTodos, setCategory, category})=>{
  
    return(
        <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map((todo)=>(
            <ToDo 
            todos = {todos} 
            setTodos = {setTodos} 
            key = {todo.id} 
            todo={todo}
            text={todo.text}
            setCategory = {setCategory}
            category = {category}
            />
          ))}

        </ul>
      </div>
    );
}

export default ToDoList;