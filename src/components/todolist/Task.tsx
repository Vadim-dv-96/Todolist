import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import { ChangeEvent } from "react";
import { TaskStatuses, TaskType } from "../../api/task-api";
import { EditableSpan } from "./EditableSpan";

type TaskPropsType = {
  removeTask: (id: string, todolistid: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistid: string) => void;
  changeTaskTittle: (taskId: string, newValue: string, todolistid: string) => void;
  task: TaskType;
  todolistId: string;
};
export const Task= React.memo( (props: TaskPropsType) => {

  const onRemoveHendler = () => {
    return props.removeTask(props.task.id, props.todolistId);
  };
  
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

    props.changeTaskStatus(props.task.id, e.currentTarget.checked 
      ? TaskStatuses.Completed : TaskStatuses.New , props.todolistId);
  },[props.task.id,props.todolistId]) 

  const onChangeTittleHandler = useCallback( (newValue: string) => {

    props.changeTaskTittle( props.task.id, newValue, props.todolistId);
  }, [ props.changeTaskTittle, props.task.id, props.todolistId ] )

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler} />

      <EditableSpan tittle={props.task.title} onChange={onChangeTittleHandler} />

      <IconButton onClick={onRemoveHendler}> <Delete /> </IconButton>

    </div>
  );
})
