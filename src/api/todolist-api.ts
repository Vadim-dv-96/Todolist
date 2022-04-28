import axios, { AxiosResponse } from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "9e4686de-4379-4e75-89bc-e99abdd3cdc3"
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')

        // let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        // return promise
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>("auth/me")
    },
    logout() {
        return instance.delete<ResponseType>("auth/login")
    }
}
// types
export type MeResponseType = {
    id: number
    email: string
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type ResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
