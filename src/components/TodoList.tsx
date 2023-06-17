import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface PropsList {
    todos: Array<Todo>
    handleDone: (id: number) => void
    handleRemove: (id: number) => void
    handleEdit: (id: number, newVersion: string ) => void
    // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<PropsList> = ({todos, handleDone, handleRemove, handleEdit}) => {

    const markAsDone = (id: number) => {
        handleDone(id)
        // setTodos(todos.map( (todo) => todo.id === id ? {...todo, isDone: !todo.isDone } : todo ));
    }

    const handleDelete = (id: number) => {
        handleRemove(id)
        // setTodos(todos.filter( todo => todo.id !== id))
    }

    const handleSubmitEdit = (id: number, newTodo: string) => {
      handleEdit(id, newTodo)
      // setTodos(
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, todo: newTodo } : todo
      //   )
      // );
    }

  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo 
          todo={todo} 
          key={todo.id} 
          handleDone={markAsDone} 
          handleDelete={handleDelete} 
          handleSubmitEdit={handleSubmitEdit}
        />
      ))}
    </div>
  );
}

export default TodoList