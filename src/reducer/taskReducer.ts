import { Todo } from "../model"

type taskReducerAction = 
{
    type: 'add'
    payload: string
} | {
    type: 'remove'
    payload: number
} | {
    type: 'done'
    payload: number
} | {
    type: 'edit'
    payload: {
        id: number,
        newTodoV: string
    }
}


export function taskReducer(state: Todo[], action: taskReducerAction) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    
    case 'done':
        return state.map( todo => todo.id === action.payload ? {...todo, isDone: !todo.isDone } : todo)

    case 'remove':
        return state.filter( todo => todo.id !== action.payload)
    
    case "edit": 
        return  state.map((todo) =>
            todo.id === action.payload.id ? { ...todo, todo: action.payload.newTodoV } : todo
          )
    default: 
      return state
  }
}