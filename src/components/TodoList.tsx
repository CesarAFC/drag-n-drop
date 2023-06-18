import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import './styles.css';

interface PropsList {
    todos: Array<Todo>
    handleDone: (id: number) => void
    handleRemove: (id: number) => void
    handleEdit: (id: number, newVersion: string ) => void
    setTodos: () => void
    completedTodo: Todo[]
    setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<PropsList> = ({todos, handleDone, handleRemove, handleEdit, completedTodo, setCompletedTodo, setTodos}) => {

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

    const onDragEnd = (result: DropResult) => {
      const { source, destination } = result;
      // console.log(result)
      if(!destination) return;
      if(destination.droppableId === source.droppableId && destination.index === source.index) return; 

      let add, 
      active = todos, 
      complete = completedTodo;

      if (source.droppableId === "pendingTask") {
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
  
      // Destination Logic
      if (destination.droppableId === "pendingTask") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
      console.log(todos)
      setCompletedTodo(complete);
      // console.log(active)
      // setTodos(active);
    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="container">

      <Droppable droppableId='pendingTask'>
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className='todos__heading'>Pending Task</span>
            {todos.map((todo, index) => (
              <SingleTodo 
              index={index}
              todo={todo} 
              key={todo.id} 
              handleDone={markAsDone} 
              handleDelete={handleDelete} 
              handleSubmitEdit={handleSubmitEdit}
              />
            ))}
            {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      
      <Droppable droppableId='completedTask'>
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : "" }`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos__heading'>Completed Task</span>
              {completedTodo.map((todo, index) => (
              <SingleTodo 
              index={index}
              todo={todo} 
              key={todo.id} 
              handleDone={markAsDone} 
              handleDelete={handleDelete} 
              handleSubmitEdit={handleSubmitEdit}
              />
              ))}
            {provided.placeholder}
          </div>
          )
        }
      </Droppable>
        
    </div>

    </DragDropContext>
  );
}

export default TodoList