import { v1 } from "uuid";
import { FilterValuesType, TasksStateType, TodolistType } from "../App";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskid: string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    tittle: string,
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS",
    taskid: string
    todolistId: string,
    isDone: boolean
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE",
    taskid: string
    todolistId: string,
    tittle: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType

export const tasksReducer = (state: TasksStateType,action: ActionsType): TasksStateType => {
  
  switch (action.type) {
    case "REMOVE-TASK": {

      const stateCopy = {...state};
      const tasks = state[ action.todolistId ]
      const filteredTasks = tasks.filter( t => t.id !== action.taskid )
      stateCopy[ action.todolistId ] = filteredTasks;

      return stateCopy
      
    }
    case "ADD-TASK": {
      
      const stateCopy = {...state}
      const tasks = state[ action.todolistId ]
      const newTask = {
        id: v1(), 
        tittle: action.tittle, 
        isDone: false
      };
      const newTasks = [ newTask , ...tasks ];
      stateCopy[ action.todolistId ] = newTasks;

      return stateCopy

    }
    case "CHANGE-TASK-STATUS": {

      const stateCopy = {...state};
      const tasks = state[ action.todolistId ]
      const task = tasks.find((t) => t.id === action.taskid)
      if (task) {
        task.isDone = action.isDone
      };
      return stateCopy
    }
    case "CHANGE-TASK-TITLE": {

      const stateCopy = {...state};
      const tasks = state[ action.todolistId ]
      const task = tasks.find((t) => t.id === action.taskid)
      if (task) {
        task.tittle = action.tittle
      };
      return stateCopy
    } 
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTaskAC = (taskid: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId: todolistId, taskid: taskid}
 }
export const addTaskAC = (tittle: string, todolistId: string ): AddTaskActionType => {
    return { type: "ADD-TASK", tittle: tittle, todolistId: todolistId}
 }
export const changeTaskStatusAC = (taskid: string, isDone: boolean, todolistId: string ): ChangeTaskStatusType => {
    return { type: "CHANGE-TASK-STATUS", taskid: taskid, isDone: isDone, todolistId: todolistId}
 }
export const changeTaskTitleAC = (taskid: string, tittle: string, todolistId: string ): ChangeTaskTitleType => {
    return { type: "CHANGE-TASK-TITLE", taskid: taskid, tittle: tittle, todolistId: todolistId}
 }

