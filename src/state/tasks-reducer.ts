import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/task-api";
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
  status: TaskStatuses
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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

  switch (action.type) {
    case "REMOVE-TASK": {

      const stateCopy = { ...state };
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter(t => t.id !== action.taskid)
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy

    }
    case "ADD-TASK": {

      const stateCopy = { ...state }
      const tasks = state[action.todolistId]
      const newTask: TaskType = {
        id: v1(),
        title: action.tittle,
        status: TaskStatuses.New,
        todoListId: action.todolistId,
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
      };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;

      return stateCopy

    }
    case "CHANGE-TASK-STATUS": {

      const todolistTasks = state[action.todolistId]
      state[action.todolistId] = todolistTasks.map(t => t.id === action.taskid
        ? { ...t, status: action.status }
        : t)
      return ({ ...state })
    }
    case "CHANGE-TASK-TITLE": {

      const todolistTasks = state[action.todolistId]
      state[action.todolistId] = todolistTasks.map(t => t.id === action.taskid
        ? { ...t, title: action.tittle }
        : t)
      return ({ ...state })
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state }
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistid]
      return stateCopy
    }
    default:
      return state
  }
};

export const removeTaskAC = (taskid: string, todolistId: string): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todolistId: todolistId, taskid: taskid }
}
export const addTaskAC = (tittle: string, todolistId: string): AddTaskActionType => {
  return { type: "ADD-TASK", tittle: tittle, todolistId: todolistId }
}
export const changeTaskStatusAC = (taskid: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusType => {
  return { type: "CHANGE-TASK-STATUS", taskid: taskid, status, todolistId: todolistId }
}
export const changeTaskTitleAC = (taskid: string, tittle: string, todolistId: string): ChangeTaskTitleType => {
  return { type: "CHANGE-TASK-TITLE", taskid: taskid, tittle: tittle, todolistId: todolistId }
}

