import { useEffect, useState } from 'react'
import { taskApi } from '../api/task-api'


export default {
    title: 'APITask'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "02bb2207-66f3-4090-a1e5-c82447ec4883"
    const count = 10
    const page = 1
    useEffect(() => {
        taskApi.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const title = "Angular"
    const todolistId = "02bb2207-66f3-4090-a1e5-c82447ec4883"
    useEffect(() => {
        taskApi.createTask(todolistId,title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "e8d67629-d459-4beb-af3c-07e8b66f93e4"
    const taskId = "928a7261-6f66-40a9-8986-9a32b3538e78"
    useEffect(() => {
        taskApi.deleteTask(todolistId,taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "02bb2207-66f3-4090-a1e5-c82447ec4883"
    const taskId = "a55976e1-c2c0-4549-9fda-cb612052f013"
    const model = {
        title: "XXXXXX",
    description: "",
    status: 3,
    priority: 2,
    startDate: "",
    deadline: ""
    }
    const title = "CSS"
    useEffect(() => {
        taskApi.updateTask(todolistId, taskId, model).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}