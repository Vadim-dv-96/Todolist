import { TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {

  tittle: string;
  onChange: ( newValue: string ) => void
  

};
export const EditableSpan = React.memo( function (props: EditableSpanPropsType) {
  console.log("EditableSpan")

  const [ editMode, setEditMode ] = useState( false );

  const [ tittle, setTittle ] = useState( "" );

  const activateEditMode = () => {
    setEditMode(true);
    setTittle(props.tittle)
  };
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(tittle)
  };

  const onChangeTittleHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    setTittle( e.currentTarget.value )
  }

  return ( editMode
     ? <TextField  variant={"standard"} value={tittle} onChange={ onChangeTittleHandler } onBlur = { activateViewMode } autoFocus /> 
     : <span onDoubleClick={ activateEditMode } >{props.tittle}</span>
  );
} )
