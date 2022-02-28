import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import { ChangeEvent } from "react";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";


export type TaskType = {
  id: string;
  tittle: string;
  isDone: boolean;
};

type PropsType = {
  tittle: string;
  tasks: Array<TaskType>;
  removeTask: (id: string,todolistid:string) => void;
  changeFilter: (value: FilterValuesType, todolistid:string ) => void;
  addTask: (tittle: string,todolistid:string) => void;
  changeTaskStatus: ( taskId:string, isDone:boolean,todolistid:string ) => void;
  changeTaskTittle: ( taskId:string, newValue:string,todolistid:string ) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist:( todolistid:string ) => void;
  changeTodolistTittle:( todolistid:string, newTittle: string ) => void;
  
};

export function TodoList(props: PropsType) {

  const onAllClickHendler = () => {props.changeFilter("all", props.id )};

  const onActiveClickHendler = () => {props.changeFilter("active", props.id )};

  const onComletedClickHendler = () => {props.changeFilter("completed", props.id )};

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const addTask = ( tittle: string ) => {
  
    props.addTask( tittle, props.id )
  } 

  const changeTodolistTittle = (newTittle:string) => {
   props.changeTodolistTittle(  props.id,newTittle )
  }

  return (
    <div>
      <h3> <EditableSpan tittle={props.tittle} onChange={ changeTodolistTittle } /> 

      <IconButton onClick={removeTodolist}> <Delete/> </IconButton>
      
      <AddItemForm  addItem={ addTask } />
      </h3>

      <div>
        {props.tasks.map((t) => {

          const onRemoveHendler = () => {
            return props.removeTask(t.id,props.id);
          };
          const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => { 
            
            props.changeTaskStatus(t.id,e.currentTarget.checked,props.id)
           };
          const onChangeTittleHandler = (newValue:string) => { 
            
            props.changeTaskTittle(t.id,newValue,props.id)
           };
          return (
            <div key={t.id} className={ t.isDone ? "is-done" : "" } >
              <Checkbox checked={ t.isDone }  onChange={onChangeStatusHandler} />

              <EditableSpan tittle = { t.tittle } onChange={ onChangeTittleHandler } />

               <IconButton onClick={onRemoveHendler}> <Delete/> </IconButton>
               
            </div>
          );
        })}
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
};


