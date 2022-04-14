import { Dispatch } from "redux";
import { taskApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from "../api/task-api";
import { TasksStateType } from "../App";
import { AppRootState } from "./store";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK",
  todolistId: string,
  taskid: string
}
export type AddTaskActionType = {
  type: "ADD-TASK",
  task: TaskType
}
export type UpdateTaskActionType = {
  type: "UPDATE-TASK",
  taskid: string
  todolistId: string,
  model: UpdateDomainTaskModelType
}
export type ChangeTaskTitleType = {
  type: "CHANGE-TASK-TITLE",
  taskid: string
  todolistId: string,
  tittle: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType | ChangeTaskTitleType | AddTodolistActionType
  | RemoveTodolistActionType | SetTodolistActionType | SetTasksActionType

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
    case "SET-TODOS": {
      const copyState = { ...state }
      action.todos.forEach((tl) => {
        copyState[tl.id] = []
      })
      return copyState
    }

    case "SET-TASKS": {
      const copyState = { ...state }
      copyState[action.todoId] = action.tasks
      return copyState
    }

    case "REMOVE-TASK": {

      const stateCopy = { ...state };
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter(t => t.id !== action.taskid)
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy

    }
    case "ADD-TASK": {
      const stateCopy = { ...state }
      const newTask = action.task
      const tasks = stateCopy[newTask.todoListId]
      const newTasks = [newTask, ...tasks]
      stateCopy[newTask.todoListId] = newTasks
      // variant 2
      // const stateCopy = { ...state }
      // const tasks = stateCopy[action.task.todoListId]
      // const newTasks = [action.task, ...tasks];
      // stateCopy[action.task.todoListId] = newTasks;

      return stateCopy

    }
    case "UPDATE-TASK": {

      const todolistTasks = state[action.todolistId]
      state[action.todolistId] = todolistTasks.map(t => t.id === action.taskid
        ? { ...t, ...action.model }
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
      stateCopy[action.todolist.id] = []
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: "ADD-TASK", task }
}
export const updateTaskAC = (taskid: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
  return { type: "UPDATE-TASK", taskid: taskid, model, todolistId: todolistId }
}

export const setTasksAC = (todoId: string, tasks: Array<TaskType>) => {
  return { type: "SET-TASKS", todoId, tasks } as const
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  taskApi.getTasks(todoId)
    .then((res) => {
      const tasks = res.data.items
      dispatch(setTasksAC(todoId, tasks))
    })
}

export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
  taskApi.createTask(todolistId, taskTitle)
    .then((res) => {
      const task = res.data.data.item
      dispatch(addTaskAC(task))
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  taskApi.deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTaskAC(taskId, todolistId))
    })
}

// export const changeTaskTitleTC = (taskId: string, newTittle: string, todolistid: string) => (dispatch: Dispatch, getState: () => AppRootState) => {
//   const state = getState()
//   const task = state.tasks[todolistid].find(t => {
//     return t.id === taskId
//   })
//   if (task) {
//     const model: UpdateTaskModelType = {
//       title: newTittle,
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       status: task.status
//     }
//     taskApi.updateTask(todolistid, taskId, model)
//     .then((res) => {
//       const action = changeTaskTitleAC(taskId, newTittle, todolistid)
//       dispatch(action)
//     })
//   }
// }

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel:UpdateDomainTaskModelType, todolistid: string) => (dispatch: Dispatch, getState: () => AppRootState) => {
  //  variant 2
  // const allTasksFromState = getState().tasks;
  // const tasksForCurrentTodolist = allTasksFromState[todolistid]
  // const task = tasksForCurrentTodolist.find(t => {
  //   return t.id === taskId
  // })
  const state = getState()
  const task = state.tasks[todolistid].find(t => {
    return t.id === taskId
  })

  if (task) {
    const Apimodel: UpdateTaskModelType = {
      title: task.title,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      ...domainModel
    }
    taskApi.updateTask(todolistid, taskId, Apimodel)
      .then((res) => {
        dispatch(updateTaskAC(taskId, domainModel, todolistid))
      })
  }

}

