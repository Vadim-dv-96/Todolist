import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "9e4686de-4379-4e75-89bc-e99abdd3cdc3"
    }
})

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}



export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodoType>>('todo-lists')

        // let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        // return promise
    },

    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', { title })

    },

    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)

    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, { title })
    }
}