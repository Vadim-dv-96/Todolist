import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskType } from "../../api/task-api";
import { RequestStatusType } from "../../state/app-reducer";
import { fetchTasksTC } from "../../state/tasks-reducer";
import { FilterValuesType } from "../../state/todolists-reducer";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";


type PropsType = {
  tittle: string;
  tasks: Array<TaskType>;
  removeTask: (id: string,todolistid:string) => void;
  changeTaskStatus: ( taskId:string, status: TaskStatuses,todolistid:string ) => void;
  changeTaskTittle: ( taskId:string, newValue:string,todolistid:string ) => void;
  changeFilter: (value: FilterValuesType, todolistid:string ) => void;
  addTask: (tittle: string,todolistid:string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist:( todolistid:string ) => void;
  changeTodolistTittle:( todolistid:string, newTittle: string ) => void;
  entityStatus: RequestStatusType
};

export const TodoList = React.memo( function(props: PropsType) {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTasksTC(props.id))
  },[])

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const addTask = useCallback( ( tittle: string ) => {
  
    props.addTask( tittle, props.id )
  }, [ props.addTask, props.id ] );

  const changeTodolistTittle = useCallback( (newTittle:string) => {
  props.changeTodolistTittle(  props.id, newTittle )
  }, [ props.changeTodolistTittle, props.id ] )

  const onAllClickHendler = useCallback( () => {props.changeFilter("all", props.id )},[props.changeFilter, props.id]);

  const onActiveClickHendler = useCallback( () => {props.changeFilter("active", props.id )},[props.changeFilter, props.id]);

  const onComletedClickHendler = useCallback( () => {props.changeFilter("completed", props.id )},[props.changeFilter, props.id]);

  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
  }
  
  return (
    <div>
      <h3> <EditableSpan tittle={props.tittle} onChange={ changeTodolistTittle } /> 

      <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading" } > <Delete/> </IconButton>
      
      <AddItemForm  addItem={ addTask } entityStatus={props.entityStatus} />
      </h3>

      <div>
        {tasksForTodolist.map(t => <Task 
        task = { t }
        changeTaskStatus = { props.changeTaskStatus }
        changeTaskTittle = { props.changeTaskTittle }
        removeTask = { props.removeTask }
        todolistId = { props.id }
        key = { t.id }
         />  
        )}
      </div>
      <div>
        <Button variant={props.filter === "all" ? "contained" : "text"} color={"inherit"} 
        
        onClick={onAllClickHendler}>all</Button>

        <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text" }
        
        onClick={onActiveClickHendler}>active</Button>

        <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text" }
        
        onClick={onComletedClickHendler}>completed</Button>
      </div>
    </div>
  );
} )



