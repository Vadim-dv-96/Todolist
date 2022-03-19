import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

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

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolistActionType
| RemoveTodolistActionType

// const initialState: TasksStateType = {
//   [todolistid1]: [
//     { id: v1(), tittle: "CSS", isDone: true },
//     { id: v1(), tittle: "JS", isDone: true },
//     { id: v1(), tittle: "React", isDone: false },
//     { id: v1(), tittle: "Redux", isDone: false },
//   ],
//   [todolistid2]: [
//     { id: v1(), tittle: "Book", isDone: true },
//     { id: v1(), tittle: "Milk", isDone: false },
//   ],
// }
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState ,action: ActionsType): TasksStateType => {
  
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
      // state[ action.todolistId ] = tasks.map( t => t.id === action.taskid ? { ...t, isDone: action.isDone } : t )
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
    case "ADD-TODOLIST" : {
      const stateCopy = { ...state }
      stateCopy[ action.todolistId ] = []
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state};
      delete stateCopy[action.todolistid]
      return stateCopy
    }
    default:
      return state
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

