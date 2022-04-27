import { Grid, Paper } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { TaskStatuses } from "../api/task-api";
import { AppRootState } from "../state/store";
import { TasksStateType, deleteTaskTC, addTaskTC, updateTaskTC } from "../state/tasks-reducer";
import { TodolistDomainType, fetchTodosTC, FilterValuesType, changeTodolistFilterAC, removeTodolistTC, updateTodolistTitleTC, addTodolistTC } from "../state/todolists-reducer";
import { AddItemForm } from "./todolist/AddItemForm";
import { TodoList } from "./todolist/TodoList";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {

    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn )

    useEffect(() => {
        if (demo || !isLoggedIn ) {
            return
        }
        dispatch(fetchTodosTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistid: string) {
        dispatch(deleteTaskTC(todolistid, id))
    }, [dispatch])

    const addTask = useCallback(function (tittle: string, todolistid: string) {
        dispatch(addTaskTC(todolistid, tittle))
    }, [dispatch])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistid: string) {
        dispatch(updateTaskTC(taskId, { status }, todolistid))
    }, [dispatch])

    const changeTaskTittle = useCallback(function (taskId: string, newTittle: string, todolistid: string) {
        const thunk = updateTaskTC(taskId, { title: newTittle }, todolistid)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistid: string) {
        const action = changeTodolistFilterAC(value, todolistid)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistid: string) => {
        dispatch(removeTodolistTC(todolistid))
    }, [dispatch])

    const changeTodolistTittle = useCallback(function (id: string, newTittle: string) {
        const thunk = updateTodolistTitleTC(id, newTittle)
        dispatch(thunk)
    }, [dispatch])

    const addTodoList = useCallback((tittle: string) => {
        dispatch(addTodolistTC(tittle))
    }, [dispatch]);

    if(!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return <>
        <Grid container style={{ padding: "20px" }} >
            <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={3} >
            {todolists.map((tl) => {
                let allTodolistTasks = tasksObj[tl.id];
                let tasksForTodolist = allTodolistTasks;

                return (
                    <Grid key={tl.id} item >
                        <Paper style={{ padding: "10px" }} >
                            <TodoList
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTittle={changeTaskTittle}
                                changeTodolistTittle={changeTodolistTittle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    </>
}