import { AddBox } from "@mui/icons-material";
import {  IconButton, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";


type AddItemFormPropsType = {
  addItem: (tittle: string) => void
  disabled?: boolean
  
};
export const AddItemForm = React.memo( ({addItem, disabled = false}: AddItemFormPropsType) => {
  console.log("AddItemForm is called");
  

  const [newTaskTittle, setnewTaskTittle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onNewTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTittle(e.currentTarget.value);
  };

  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {

    if (error) {
      setError(null)
    };
  
    if (e.charCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    
    if (newTaskTittle.trim() !== "") {
      addItem(newTaskTittle.trim());
      setnewTaskTittle("");
    } else {
      
      setError("Tittle is required");
    }
  };

  return (
    <div>
       <TextField label={"Type value"}
        value={newTaskTittle}
        onChange={onNewTittleChangeHandler}
        onKeyPress={onKeyPressHendler}
        error={!!error}
        helperText={error}
        disabled={disabled }
         />

      <IconButton onClick={addTask}  color={"primary"} disabled={disabled} >
        <AddBox/>
      </IconButton>
    </div>
  );
} )
