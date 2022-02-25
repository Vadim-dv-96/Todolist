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
      <h3> <EditableSpan tittle={props.tittle} onChange={ changeTodolistTittle }  />
      
      <button onClick={removeTodolist} >x</button> </h3>
      
      <AddItemForm  addItem={ addTask } />

      <ul>
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
            <li key={t.id} className={ t.isDone ? "is-done" : "" } >
              <input checked={ t.isDone } type="checkbox" onChange={onChangeStatusHandler} />

              <EditableSpan tittle = { t.tittle } onChange={ onChangeTittleHandler } />

               <button onClick={onRemoveHendler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : "" }
        
        onClick={onAllClickHendler}>all</button>

        <button className={props.filter === "active" ? "active-filter" : "" }
        
        onClick={onActiveClickHendler}>active</button>

        <button className={props.filter === "completed" ? "active-filter" : "" }
        
        onClick={onComletedClickHendler}>completed</button>
      </div>
    </div>
  );
};


