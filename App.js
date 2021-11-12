import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Components/Form';
import ToDoList from './Components/ToDoList';


function App() {

  //STATE
  const[inputText, setInputText] = useState("");
  const[todos, setTodos] = useState([]);
  const[status, setStatus] = useState('All');
  const[filteredTodos, setFilteredTodos]=useState([])

//RUN ONCE
useEffect(()=>{
  getLocalTodos();
},[]);

//USE EFFECT
useEffect(()=>{
  filterHandler();
},[todos, status]);

useEffect(()=>{
  saveLocalTodos();
},[todos]);

  //FUNCTION
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo)=>todo.completed===true));
        break;
      case 'uncompleted':
          setFilteredTodos(todos.filter((todo)=>todo.completed===false));
          break;
      default:
        setFilteredTodos(todos);
      break;
    }
  };
   //SAVE TO LOCAL
   const saveLocalTodos = () =>{
     localStorage.setItem('todos',JSON.stringify(todos))
   }
   const getLocalTodos =()=>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
     setTodos(JSON.parse(localStorage.getItem('todos')));
    }
   };

  return (
    <div className="App">
      <header>
        <h1>
          Chuck's To-Do List
          </h1>
          </header>
          <Form 
          todos = {todos} 
          setTodos = {setTodos} 
          inputText = {inputText} 
          setInputText={setInputText}
          setStatus={setStatus}        
          />
          <ToDoList todos = {todos} setTodos = {setTodos}  filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
