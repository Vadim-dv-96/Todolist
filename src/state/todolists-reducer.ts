import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { todolistApi, TodolistType } from "../api/todolist-api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from "./app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {

  switch (action.type) {
    case "SET-TODOS": {
      return action.todos.map((tl => {
        return { ...tl, filter: "all", entityStatus: "idle" }
      }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistid);
    }

    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = { ...action.todolist, filter: "all", entityStatus: "idle" }
      return [newTodolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map(tl => tl.id === action.id ? { ...tl, title: action.tittle } : tl)
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)

    }

    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) => {
        if (tl.id === action.todoId) {
          return { ...tl, entityStatus: action.entityStatus }
        } else {
          return tl
        }
      })
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
export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", todoId, entityStatus } as const
}

// thunks
export const fetchTodosTC = () => (dispatch: Dispatch): void => {
  dispatch(setAppStatusAC("loading"))
  todolistApi.getTodolists()
    .then((res) => {
      let todos = res.data
      dispatch(setTodolistsAC(todos))
      dispatch(setAppStatusAC("succeeded"))
    })
    .catch((err: AxiosError) => {
      dispatch(setAppErrorAC(err.message))
      dispatch(setAppStatusAC("failed"))
    })
}

export const removeTodolistTC = (todolistid: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC(todolistid, "loading"))
  todolistApi.deleteTodolist(todolistid)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const action = removeTodolistAC(todolistid)
        dispatch(action)
        dispatch(setAppStatusAC("succeeded"))
      } else {
        dispatch(setAppErrorAC("Some Error"))
      }
      dispatch(setAppStatusAC("failed"))

    })
    .catch((err: AxiosError) => {
      dispatch(setAppErrorAC(err.message))
      dispatch(setAppStatusAC("failed"))
    })
}

export const addTodolistTC = (tittle: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistApi.createTodolist(tittle)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const action = addTodolistAC(res.data.data.item)
        dispatch(action)
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error: AxiosError) => {
      handleServerNetworkError(error, dispatch)
    })
}


export const updateTodolistTitleTC = (id: string, newTittle: string) =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.updateTodolistTitle(id, newTittle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTittleAC(id, newTittle))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error: AxiosError) => {
        handleServerNetworkError(error, dispatch)
      })
  }
  
// async await
// export const updateTodolistTitleTC = (id: string, newTittle: string) =>
//   async (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     try {
//       let res = await todolistApi.updateTodolistTitle(id, newTittle)
//       if (res.data.resultCode === 0) {
//         dispatch(changeTodolistTittleAC(id, newTittle))
//         dispatch(setAppStatusAC("succeeded"))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         handleServerNetworkError(error, dispatch)
//       }
//     }
//   }


// types
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTittleActionType = ReturnType<typeof changeTodolistTittleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTittleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistActionType
  | ChangeTodolistEntityStatusActionType

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}