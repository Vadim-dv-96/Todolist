import { Dispatch } from "redux";
import { todolistApi, TodolistType } from "../api/todolist-api";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  todolistid: string
}
export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  todolist: TodolistType
}
export type ChangeTodolistTittleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  tittle: string
  id: string
}
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  filter: FilterValuesType
  id: string
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType
  | ChangeTodolistTittleActionType | ChangeTodolistFilterActionType
  | SetTodolistActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

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

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', todolistid: todolistId }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todolist }
}
export const changeTodolistTittleAC = (id: string, tittle: string): ChangeTodolistTittleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, tittle: tittle }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id }
}

export const setTodolistsAC = (todos: Array<TodolistType>) => {
  return { type: "SET-TODOS", todos } as const
}
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

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

export const updateTodolistTitleTC = (id: string, newTittle: string) => (dispatch: Dispatch) => {
  todolistApi.updateTodolistTitle(id, newTittle)
    .then((res) => {
      dispatch(changeTodolistTittleAC(id, newTittle))
    })
}
