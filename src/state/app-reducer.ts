import { AxiosError } from "axios"
import { Dispatch } from "redux"
import { authAPI } from "../api/todolist-api"
import { setIsLoggedInAC } from "../components/Login/auth-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as NullableType<string>,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'APP/SET-STATUS':
            return { ...state, status: action.status }

        case "APP/SET-ERROR":
            return { ...state, error: action.error }

        case "APP/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }

        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return { type: "APP/SET-STATUS", status } as const
}
export const setAppErrorAC = (error: NullableType<string>) => {
    return { type: "APP/SET-ERROR", error } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return { type: "APP/SET-IS-INITIALIZED", isInitialized } as const
}

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC("loading"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type NullableType<T> = null | T

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitializedActionType