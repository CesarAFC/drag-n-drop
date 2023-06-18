import { useReducer, useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import TodoList from './components/TodoList';
import { taskReducer } from './reducer/taskReducer';
import { Todo } from './model';


function App() {
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([])
  // const [todos, setTodos] = useState<Array<Todo>>([]);
  const [state, dispatch] = useReducer(taskReducer, []);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([])

  
  const handleAdd = () => {
    // e.preventDefault();
    if (todo) {
      dispatch({type:'add', payload: todo})
      setTodo('')
      // setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
    }
  };

  const handleDone = (id: number) => {
    dispatch({type:'done', payload: id})
  }

  const handleRemove = (id: number) => {
    dispatch({type:'remove', payload: id})
  }

  const handleEdit = (id: number, newVersion: string) => {
    dispatch({type:'edit', payload: {id, newTodoV: newVersion }})
  }

  console.log(state)
  return (
    <>
      <header className="App">
        <h1 className="heading">Taskify</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}  />
        <TodoList 
          todos={state} 
          setTodos={handleAdd} 
          handleDone={handleDone}
          handleRemove={handleRemove} 
          handleEdit={handleEdit}
          completedTodo={completedTodo}
          setCompletedTodo={setCompletedTodo}
        />
      </header>
    </>
  );
}

export default App
