import { v1 } from "uuid";
import { TodolistType } from "../api/todolist-api";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  todolistid: string
}
export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  tittle: string
  todolistId: string
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
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTittleActionType | ChangeTodolistFilterActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {

  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistid);
    }

    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.tittle,
          filter: "all",
          addedDate: "",
          order: 0
        }, ...state
      ];
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
export const addTodolistAC = (tittle: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", tittle: tittle, todolistId: v1() }
}
export const changeTodolistTittleAC = (id: string, tittle: string): ChangeTodolistTittleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, tittle: tittle }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id }
}

