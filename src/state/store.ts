import { TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../components/Login/auth-reducer";
import { appReducer } from "./app-reducer";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

const rootReducer = combineReducers( {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
} );

export type AppRootState = ReturnType<typeof rootReducer>

// хук для типизации useSelector 
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;