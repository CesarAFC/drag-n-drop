import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface PropsList {
    todos: Array<Todo>
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<PropsList> = ({todos, setTodos}) => {

    const handleDone = (id: number) => {
        setTodos(todos.map( (todo) => todo.id === id ? {...todo, isDone: !todo.isDone } : todo ));
    }

  return (
    <div className="todos">
        { todos.map(todo => (
            <SingleTodo todo={todo} key={todo.id} handleDone={handleDone} /> 
        )) }
    </div>
  )
}

export default TodoList