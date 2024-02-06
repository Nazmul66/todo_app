import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [newTitle, setNewTitle] = useState("")
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);


  // form data submit todo
  const handleForm = () =>{
      let content = newTitle;

    let newTodoItem = {
        content: content,
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    localStorage.setItem('todo', JSON.stringify(updateTodoArr));
    setAllTodos(updateTodoArr);
  }


  // delete data and completed task data will reduce when the task is completed
  const handleDelete = (index) =>{
    let reduceTodos = [...allTodos];
    if (reduceTodos[index].completed) {
        setCompletedTodos(completedTodos => completedTodos.filter((_, i) => i !== index));
    }
    reduceTodos.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(reduceTodos));
    setAllTodos(reduceTodos);
  }


  // update title data
  const handleUpdateTitle = (e, index) => {
    let upTitle = e.target.value;

    let updateTodo = [...allTodos];
    updateTodo[index] = { content: upTitle }; 
    localStorage.setItem('todo', JSON.stringify(updateTodo));
    setAllTodos(updateTodo);
  }


  // toggle completed status
  const toggleCompletion = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed }; // 
    localStorage.setItem('todo', JSON.stringify(updatedTodos));
    setAllTodos(updatedTodos);

    setCompletedTodos(updatedTodos.filter(todo => todo.completed));
  }


  // localStorage get data
  useEffect(() => {
     let saveTodo = JSON.parse(localStorage.getItem('todo'));
     console.log(saveTodo);
     if(saveTodo){
        setAllTodos(saveTodo);
        setCompletedTodos(saveTodo.filter(todo => todo.completed));
     }
  }, [])
  

  return (
    <>
      <main className="app">
      
          <section className="greeting">
            <h2 className="title">
              Hello there, <input type="text" />
            </h2>
          </section>

          {/* Todo Add form data */} 
            <section className="create-todo">

              <form onSubmit={handleForm}>
                <h4>What's on your todo list?</h4>
                <input 
                  type="text" 
                  name="content" 
                  id="content"
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="Write a Todo List" />

                <input type="submit" value="Add todo" />
              </form>

            {/* All Todo Task count */} 
              <h4 style={{ marginTop: "20px" }}>Task Details</h4>
              <div className="options">

                <label>
                  <h3 style={{ fontSize: "36px" }}>{ allTodos?.length }</h3>
                  <div>Total Task</div>
                </label>

                <label>
                  <h3 style={{ fontSize: "36px" }}>{ completedTodos.length }</h3>
                  <div>Completed Task</div>
                </label>

              </div> 
          </section>

          {/* All Todo List Data */}
          <section className="todo-list">
              <h3>Todo List</h3>
              {allTodos?.map((todo, index) => (
                <div key={index} className={`list ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-item">
                    <label>
                      <input
                        type="checkbox"
                        name=""
                        checked={todo.completed}
                        onChange={() => toggleCompletion(index)}
                      />
                      <span className="bubble"></span>
                    </label>

                    <div className="todo-content">
                      <input
                        type="text"
                        name="editTodo"
                        defaultValue={todo.content}
                        onChange={(e) => handleUpdateTitle(e, index)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
                      />
                    </div>

                    <div className="actions">
                      <button className="delete" onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </section>

       </main>
    </>
  )}

export default App;
