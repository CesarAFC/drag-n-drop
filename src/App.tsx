import { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todo } from './model';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([])
  const [todos, setTodos] = useState<Array<Todo>>([])

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo('')
    }
  };

  return (
    <>
      <header className='App'>
        <h1 className='heading'>Taskify</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} />
      </header>
    </>
  )
}

export default App
