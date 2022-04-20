// import { Dispatch } from "redux"
// import { ResponseType } from "../api/todolist-api"
// import { AppActionsType, setAppErrorAC, setAppStatusAC } from "../state/app-reducer"

import { Dispatch } from "redux"
import { ResponseType } from "../api/todolist-api"
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../state/app-reducer"

// export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
//     dispatch(setAppErrorAC(message))
//     dispatch(setAppStatusAC("failed"))
// }

// export const handleServerAppError = <T> (data: ResponseType<T>, dispatch: Dispatch<AppActionsType>) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC("Some Error"))
//     }
//     dispatch(setAppStatusAC("failed"))
// } 

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
 }
 
 export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
 }
 
export type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>