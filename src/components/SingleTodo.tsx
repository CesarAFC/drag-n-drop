import { Todo } from '../model'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { HiOutlineCheckCircle } from 'react-icons/hi';
import './styles.css';

type PropsSingle = {
    todo: Todo
    handleDone: (id: number) => void
}

const SingleTodo: React.FC<PropsSingle> = ({todo, handleDone}) => {

    // const handle = () => {
    //     handleDone
    // }
  return (
    <form className="todos__single">
      {todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span className="icon">
          {" "}
          <BiEdit />{" "}
        </span>
        <span className="icon">
          {" "}
          <RiDeleteBin5Line />{" "}
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          {" "}
          <HiOutlineCheckCircle />{" "}
        </span>
      </div>
    </form>
  );
}

export default SingleTodo