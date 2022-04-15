import { Dispatch } from "redux";
import { todolistApi, TodolistType } from "../api/todolist-api";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {

  switch (action.type) {
    case "SET-TODOS": {
      return action.todos.map((tl => {
        return { ...tl, filter: "all" }
      }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistid);
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: "all" }
      return [newTodolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((todolists) => todolists.id === action.id);
      if (todolist) {
        todolist.title = action.tittle;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((todolists) => todolists.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state
  }
};

// actions
export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', todolistid: todolistId } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
  return { type: "ADD-TODOLIST", todolist } as const
}
export const changeTodolistTittleAC = (id: string, tittle: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, tittle: tittle } as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id } as const
}
export const setTodolistsAC = (todos: Array<TodolistType>) => {
  return { type: "SET-TODOS", todos } as const
}

// thunks
export const fetchTodosTC = () => (dispatch: Dispatch): void => {
  todolistApi.getTodolists()
    .then((res) => {
      let todos = res.data
      dispatch(setTodolistsAC(todos))
    })
}

export const removeTodolistTC = (todolistid: string) => (dispatch: Dispatch) => {
  todolistApi.deleteTodolist(todolistid)
    .then((res) => {
      const action = removeTodolistAC(todolistid)
      dispatch(action)
    })
}

export const addTodolistTC = (tittle: string) => (dispatch: Dispatch) => {
  todolistApi.createTodolist(tittle)
    .then((res) => {
      const action = addTodolistAC(res.data.data.item)
      dispatch(action)
    })
}

export const updateTodolistTitleTC = (id: string, newTittle: string) =>
  (dispatch: Dispatch) => {
    todolistApi.updateTodolistTitle(id, newTittle)
      .then((res) => {
        dispatch(changeTodolistTittleAC(id, newTittle))
      })
  }

// types
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTittleActionType = ReturnType<typeof changeTodolistTittleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTittleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistActionType

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}