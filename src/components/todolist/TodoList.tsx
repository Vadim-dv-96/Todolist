import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskType } from "../../api/task-api";
import { RequestStatusType } from "../../state/app-reducer";
import { fetchTasksTC } from "../../state/tasks-reducer";
import { FilterValuesType, TodolistDomainType } from "../../state/todolists-reducer";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";


type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistid: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistid: string) => void;
  changeTaskTittle: (taskId: string, newValue: string, todolistid: string) => void;
  changeFilter: (value: FilterValuesType, todolistid: string) => void;
  addTask: (tittle: string, todolistid: string) => void;
  removeTodolist: (todolistid: string) => void;
  changeTodolistTittle: (todolistid: string, newTittle: string) => void;
  demo?: boolean
};

export const TodoList = React.memo(function ({ demo = false, ...props }: PropsType) {

  const dispatch = useDispatch();

  useEffect(() => {
    if (demo) {
      return
    } else {
      dispatch(fetchTasksTC(props.todolist.id))
    }
  }, [])

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id)
  }

  const addTask = useCallback((tittle: string) => {

    props.addTask(tittle, props.todolist.id)
  }, [props.addTask, props.todolist.id]);

  const changeTodolistTittle = useCallback((newTittle: string) => {
    props.changeTodolistTittle(props.todolist.id, newTittle)
  }, [props.changeTodolistTittle, props.todolist.id])

  const onAllClickHendler = useCallback(() => { props.changeFilter("all", props.todolist.id) }, [props.changeFilter, props.todolist.id]);

  const onActiveClickHendler = useCallback(() => { props.changeFilter("active", props.todolist.id) }, [props.changeFilter, props.todolist.id]);

  const onComletedClickHendler = useCallback(() => { props.changeFilter("completed", props.todolist.id) }, [props.changeFilter, props.todolist.id]);

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }

  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3> <EditableSpan tittle={props.todolist.title} onChange={changeTodolistTittle} />

        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"} > <Delete /> </IconButton>

        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      </h3>

      <div>
        {tasksForTodolist.map(t => <Task
          task={t}
          changeTaskStatus={props.changeTaskStatus}
          changeTaskTittle={props.changeTaskTittle}
          removeTask={props.removeTask}
          todolistId={props.todolist.id}
          key={t.id}
        />
        )}
      </div>
      <div>
        <Button variant={props.todolist.filter === "all" ? "contained" : "text"} color={"inherit"}

          onClick={onAllClickHendler}>all</Button>

        <Button color={"primary"} variant={props.todolist.filter === "active" ? "contained" : "text"}

          onClick={onActiveClickHendler}>active</Button>

        <Button color={"secondary"} variant={props.todolist.filter === "completed" ? "contained" : "text"}

          onClick={onComletedClickHendler}>completed</Button>
      </div>
    </div>
  );
})



