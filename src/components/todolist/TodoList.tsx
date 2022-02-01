import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";


export type TaskType = {
  id: string;
  tittle: string;
  isDone: boolean;
};

type PropsType = {
  tittle: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (tittle: string) => void;
  changeTaskStatus: ( taskId:string, isDone:boolean ) => void
  filter: FilterValuesType
  
};

export function TodoList(props: PropsType) {

  const [newTaskTittle, setnewTaskTittle] = useState("");
  const [error, setError] = useState <string | null> ( null );

  const onNewTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTittle(e.currentTarget.value);
  };
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError( null )
    if (e.charCode === 13) {
      props.addTask(newTaskTittle);
      setnewTaskTittle("");
    }
  };
  const addTask = () => {
    if ( newTaskTittle.trim() !== "" ) {
       props.addTask(newTaskTittle)
    setnewTaskTittle("");
     } else {
      setError( "Tittle is required" )
    }

    
  };
  const onAllClickHendler = () => {props.changeFilter("all")};
  const onActiveClickHendler = () => {props.changeFilter("active")};
  const onComletedClickHendler = () => {props.changeFilter("completed")};
  

  return (
    <div>
      <h3>{props.tittle}</h3>
      <div>
        <input
          value={newTaskTittle}
          onChange={onNewTittleChangeHandler}
          onKeyPress={onKeyPressHendler}
          className={ error ? "error" : "" }
        />

        <button onClick={addTask}>+</button>
         { error && <div className="error-message" > { error } </div> }
      </div>

      <ul>
        {props.tasks.map((t) => {

          const onRemoveHendler = () => {
            return props.removeTask(t.id);
          };
          const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => { 
            
            props.changeTaskStatus(t.id,e.currentTarget.checked)
           };
          return (
            <li key={t.id} className={ t.isDone ? "is-done" : "" } >
              <input checked={ t.isDone } type="checkbox" onChange={onChangeHandler} />
              <span>{t.tittle}</span>

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
}
