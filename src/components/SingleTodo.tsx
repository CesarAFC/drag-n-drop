import { Todo } from '../model'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { HiOutlineCheckCircle } from 'react-icons/hi';
import './styles.css';
import { useEffect, useRef, useState } from 'react';

type PropsSingle = {
    todo: Todo
    handleDone: (id: number) => void
    handleDelete: (id: number) => void
    handleSubmitEdit: (id: number, newTodo: string) => void

}

const SingleTodo: React.FC<PropsSingle> = ({todo, handleDone, handleDelete, handleSubmitEdit}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = () => {
    if(!edit && !todo.isDone) {
      setEdit(!edit)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmitEdit(todo.id, editTodo)
    setEdit(false)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  

  return (
    <form className="todos__single" onSubmit={handleSubmit}>
      {edit ? (
        <input
          type="text"
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon" onClick={handleEdit}>
          <BiEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <RiDeleteBin5Line />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <HiOutlineCheckCircle />
        </span>
      </div>
    </form>
  );
}

export default SingleTodo