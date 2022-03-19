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

// export let todolistid1 = v1();
// export let todolistid2 = v1();

// const initialState: Array<TodolistType> = [
//   { id: todolistid1, tittle: "What to learn", filter: "all" },
//   { id: todolistid2, tittle: "What to buy", filter: "all" },
// ]
const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState ,action: ActionsType): Array<TodolistType> => {
  
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistid);
    }

    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          tittle: action.tittle,
          filter: "all"
        }, ...state
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
      return state
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
export const changeTodolistFilterAC = (filter:FilterValuesType, id: string ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter:filter, id:id}
 }
 
