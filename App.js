import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './Components/Form';
import ToDoList from './Components/ToDoList';


function App() {

  //STATE
  const[inputText, setInputText] = useState("");
  const[inputCategory, setInputCategory] = useState("");
  const[todos, setTodos] = useState([]);
  const[status, setStatus] = useState('All');
  const[filteredTodos, setFilteredTodos]=useState([])
  const[category, setCategory] = useState('All');

//RUN ONCE
useEffect(()=>{
  getLocalTodos();
},[]);

//USE EFFECT
useEffect(()=>{
  filterHandler();
},[todos, status]);

useEffect(()=>{
  categoryHandler();
},[todos, category]);

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
  const categoryHandler = () =>{
    switch(category){
      case 'all':
        setFilteredTodos(todos);
        break;
      case 'work1':
        setFilteredTodos(todos.filter((todo)=>todo.category==='work1'));
        break;
      case 'work2':
        setFilteredTodos(todos.filter((todo)=>todo.category==='work2'));
        break;
      case 'personal':
        setFilteredTodos(todos.filter((todo)=>todo.category==='personal'));
        break;
      case 'other':
        setFilteredTodos(todos.filter((todo)=>todo.category==='other'));
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
        <h1>Chuck's To-Do List</h1>
      </header>

  <h2 className="entry-header">TO DO ENTRY</h2>  

        <Form 
            todos = {todos} 
            setTodos = {setTodos} 
            inputText = {inputText} 
            setInputText={setInputText}
            inputCategory = {inputCategory} 
            setInputCategory={setInputCategory}
            setStatus={setStatus}        
            setCategory = {setCategory}
            category = {category}
            />
        <h2 className="list-header">TO DO LIST</h2>
        <ToDoList 
            todos = {todos} 
            setTodos = {setTodos}  
            filteredTodos={filteredTodos}  
            setCategory = {setCategory}
            category = {category}
             />
    </div>
  );
}

export default App;
