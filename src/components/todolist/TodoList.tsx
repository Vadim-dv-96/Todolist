import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";


export type TaskType = {
  id: string;
  tittle: string;
  isDone: boolean;
};

type PropsType = {
  tittle: string;
  tasks: Array<TaskType>;
  removeTask: (id: string,todolistid:string) => void;
  changeTaskStatus: ( taskId:string, isDone:boolean,todolistid:string ) => void;
  changeTaskTittle: ( taskId:string, newValue:string,todolistid:string ) => void;
  changeFilter: (value: FilterValuesType, todolistid:string ) => void;
  addTask: (tittle: string,todolistid:string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist:( todolistid:string ) => void;
  changeTodolistTittle:( todolistid:string, newTittle: string ) => void;
  
};

export const TodoList = React.memo( function(props: PropsType) {
  console.log("todolist is called")

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
    tasksForTodolist = props.tasks.filter((t) => t.isDone === false)
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.isDone === true)
  }
  
  return (
    <div>
      <h3> <EditableSpan tittle={props.tittle} onChange={ changeTodolistTittle } /> 

      <IconButton onClick={removeTodolist}> <Delete/> </IconButton>
      
      <AddItemForm  addItem={ addTask } />
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



