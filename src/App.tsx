import { useReducer, useState } from 'react'
import './App.css'
import InputField from './components/InputField'
// import { Todo } from './model';
import TodoList from './components/TodoList';
import { taskReducer } from './reducer/taskReducer';


function App() {
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([])
  // const [todos, setTodos] = useState<Array<Todo>>([]);
  const [state, dispatch] = useReducer(taskReducer, []);

  
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <>
      <header className="App">
        <h1 className="heading">Taskify</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}  />
        <TodoList 
          todos={state} 
          // setTodos={setTodos} 
          handleDone={handleDone}
          handleRemove={handleRemove} 
          handleEdit={handleEdit}
        />
      </header>
    </>
  );
}

export default App
