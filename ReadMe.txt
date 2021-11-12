
INSTRUCTIONS

TO ADD AN EVENT HANDLER
1. in app.js    
  - add hook ... import React, {useState} from 'react';
  - add state const... const[inputText, setInputText] = useState("");  OR...  const[todos, setTodos] = useState([]);
  - pass down setter... <Form setInputText={setInputText}/>    OR... <Form todos = {todos} setTodos = {setTodos} setInputText={setInputText}/>

2. in component (in this case called Form)
 - create setter ...
        const Form = ({setInputText})=>{
            const inputTextHandler = (e) =>{
                setInputText(e.target.value);
            };
            return(  ...
 - add event trigger into html element...
        onChange = {inputTextHandler}


TO ADD A MAPPED LIST
1. in the list component
 - pass in the list item... const ToDoList = ({todos})=>{  ...
2. in the list return
 - use curly brackets to indicate you are inserting javascript
 - add the map function...
        {todos.map(todo=>(
            <ToDo key = {todo.id} text={todo.text}/>
        ))}
3. in the list element component, pass the value...
    a. first in the const ... const ToDo = ({text})=>{
    b. next in the returned html ... <li className="todo-item"> {text} </li>

TO PASS DOWN STATE FROM APP TO LOWER COMPONENT. 
 - in this case from App -> ToDoList -> ToDo with the setToDos state
 1. In App's return  ... <ToDoList todos = {todos} setTodos = {setTodos} />
 2. In ToDoList return ... 
    a. pass it in the const ... const ToDoList = ({todos, setTodos})=>{
    b. add it to ToDoList's return ... 
                 {todos.map(todo=>(
            <ToDo todos = {todos} setTodos = {setTodos} key = {todo.id} text={todo.text}/>
          ))}
  3. In ToDo
    a. xxx add the import of the ToDoList ... import ToDoList from './ToDoList'
    b. pass it in the const ... const ToDo = ({text, ToDo, setToDos})=>{
    c. add it to the return where needed

TO DELETE A LIST ELEMENT.
1. in list, 
    a. modify arrow function to use each element...
       {todos.map((todo)=>(
    b. modify the ToDo html element to ensure it includes...
         todo={todo} ... so that an individual element is available in the list element for filtering
2. in list element
    a. ensure both each element and the group state are passed to const...
        const ToDo = ({text, todo, todos, setTodos})=>{
    b. add a handler that uses a filter
        const trashHandler = ()=>{
            setTodos(todos.filter((el)=>el.id !==todo.id));
        }
    
TO PASS STATE TO MODIFY STYLING
    1. in the html list item, modify the syntax ...
     - <li className={`todo-item ${todo.completed ? "completed" : ""}`}> {text} </li>
     - this indicates that it is javascript, and the styling varies on the boolean value
     2. in the css...
      - logic for a completed item...
         .completed {
            text-decoration: line-through;
            opacity: 0.5;
        }

ADDING USEEFFECT
        1. in App.js
            a. add import ... import React, {useState, useEffect} from 'react';
            b. add useEffect to function after the consts
                useEffect(()=>{
                    filterHandler();
                },[todos, status]);
            c. add filteredTodos = {filteredTodos} ... into the ToDoList html target
                <ToDoList todos = {todos} setTodos = {setTodos}  filteredTodos={filteredTodos} />
        2. in list...
            a. replace todos with filteredTodos in the list function return
              return(
                 <div className="todo-container">
                <ul className="todo-list">
                {filteredTodos.map((todo)=>(
                <ToDo ...

ADDING LOCAL STORAGE (PERSISTENCE)
    1. in App.js in function, 
        a. before return, add the function
              const saveLocalTodos = () =>{
                localStorage.setItem('todos',JSON.stringify(todos))
            }
            const getLocalTodos =()=>{
                if(localStorage.getItem('todos')===null){
                    localStorage.setItem('todos',JSON.stringify([]));
                 }else{
                    let todoLocal = JSON.parse(localStorage.getItem('todos'));
                    setTodos(todoLocal);
                }
            }
        b. just after the state consts...
            //RUN ONCE
            useEffect(()=>{
                getLocalTodos();
            },[]);
            //USE useEffect
            useEffect(()=>{
                 saveLocalTodos();
            },[todos]);
