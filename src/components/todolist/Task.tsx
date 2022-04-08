import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import { ChangeEvent } from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./TodoList";

type TaskPropsType = {
  removeTask: (id: string, todolistid: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistid: string) => void;
  changeTaskTittle: (taskId: string, newValue: string, todolistid: string) => void;
  task: TaskType;
  todolistId: string;
};
export const Task= React.memo( (props: TaskPropsType) => {

  const onRemoveHendler = () => {
    return props.removeTask(props.task.id, props.todolistId);
  };
  
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
  };

  const onChangeTittleHandler = useCallback( (newValue: string) => {

    props.changeTaskTittle( props.task.id, newValue, props.todolistId);
  }, [ props.changeTaskTittle, props.task.id, props.todolistId ] )

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} />

      <EditableSpan tittle={props.task.tittle} onChange={onChangeTittleHandler} />

      <IconButton onClick={onRemoveHendler}> <Delete /> </IconButton>

    </div>
  );
})
