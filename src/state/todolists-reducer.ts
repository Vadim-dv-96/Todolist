import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

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

export const todolistsReducer = (state: Array<TodolistType>,action: ActionsType): Array<TodolistType> => {
  
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistid);
    }

    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.todolistId,
          tittle: action.tittle,
          filter: "all",
        },
      ];
    }

    case "CHANGE-TODOLIST-TITLE": {

      const todolist = state.find((todolists) => todolists.id === action.id);
      if (todolist) {
        todolist.tittle = action.tittle;
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
      throw new Error("I don't understand this type");
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', todolistid: todolistId}
 }
export const addTodolistAC = (tittle: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", tittle:tittle, todolistId: v1() }
 }
export const changeTodolistTittleAC = (id: string, tittle: string): ChangeTodolistTittleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id:id, tittle:tittle}
 }
export const changeTodolistFilterAC = (id: string, filter:FilterValuesType ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id:id, filter:filter}
 }
 
