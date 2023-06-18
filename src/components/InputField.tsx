import { useRef } from 'react'
import './styles.css'

interface PropsInput {
    todo: string
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (todo: string) => void
}

// const InputField = ({todo, setTodo}: Propsinput) => {
const InputField: React.FC<PropsInput> = ({todo, setTodo, handleAdd}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleAdd(todo)
        // To change the focus back to the document
        inputRef.current?.blur()
    }

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input 
      ref={inputRef}
      value={todo}
      onChange={e => setTodo(e.target.value)}
      type="text" 
      placeholder="Enter a task" 
      className="input__box" />
      <button className="input_submit" type="submit">Go</button>
    </form>
  );
}

export default InputField