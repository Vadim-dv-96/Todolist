import { useEffect, useState } from 'react'
import { todolistApi } from '../api/todolist-api'

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = "REDUX"
    useEffect(() => {
        todolistApi.createTodolist(title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "712c5c63-fb98-4432-aa8e-9ea62e25735c"
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "9431f1eb-8f61-4717-947b-bbed9866da96"
    const title = "LINA@"
    useEffect(() => {
        todolistApi.updateTodolistTitle(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
