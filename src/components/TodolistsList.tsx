import { Grid, Paper } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TaskStatuses } from "../api/task-api";
import { AppRootState } from "../state/store";
import { TasksStateType, deleteTaskTC, addTaskTC, updateTaskTC } from "../state/tasks-reducer";
import { TodolistDomainType, fetchTodosTC, FilterValuesType, changeTodolistFilterAC, removeTodolistTC, updateTodolistTitleTC, addTodolistTC } from "../state/todolists-reducer";
import { AddItemForm } from "./todolist/AddItemForm";
import { TodoList } from "./todolist/TodoList";

export const TodolistsList = () => {

    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [dispatch])

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
                                entityStatus={tl.entityStatus}
                                id={tl.id}
                                tittle={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTittle={changeTaskTittle}
                                changeTodolistTittle={changeTodolistTittle}
                            />
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    </>
}