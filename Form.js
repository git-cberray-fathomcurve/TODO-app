import React from 'react';

const Form = ({inputText, setInputText, todos, setTodos, status, setStatus, setCategory, inputCategory, setInputCategory})=>{
  //INPUT HANDLERS  
  const inputTextHandler = (e) =>{
      setInputText(e.target.value);
    };
    const inputCategoryHandler = (e) =>{
      setInputCategory(e.target.value);
    };
    //VIEW HANDLERS
    const submitToDoHandler = (e) =>{
      e.preventDefault();
      setTodos([...todos, {text: inputText, category: inputCategory, completed: false, id: Math.random()*1000 }]);
      //console.log(todos)
      setInputText("");
      setInputCategory("")
    };
    const statusHandler=(e)=>{
      setStatus(e.target.value);
    }
    const categoryHandler=(e)=>{
      setCategory(e.target.value);
    }
 
    return(
        <form>
        <select value = {inputCategory} onChange = {inputCategoryHandler}  name="category" className="category-input">
            <option value="all">Category Input Type</option>
            <option value="work1">Work1</option>
            <option value="work2">Work2</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
            
        </select>
        
        <input value = {inputText} onChange = {inputTextHandler} type="text" className="todo-input" />
      
        <button onClick = {submitToDoHandler} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>

        <div className="select">
          <select onChange = {statusHandler} name="todos" className="filter-todo">
            <option value="all">Status Filter - All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>

        <div className="select2">
          <select onChange = {categoryHandler} name="todos" className="filter-category">
          <option value="all">Category Filter - All</option>
            <option value="work1">Work1</option>
            <option value="work2">Work2</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>

        </div>
      </form>
    );
}

export default Form;