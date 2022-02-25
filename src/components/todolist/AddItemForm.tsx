import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (tittle: string) => void;
  
};
export function AddItemForm(props: AddItemFormPropsType) {

  const [newTaskTittle, setnewTaskTittle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onNewTittleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setnewTaskTittle(e.currentTarget.value);
  };

  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    
    setError(null);
    
    if (e.charCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    
    if (newTaskTittle.trim() !== "") {
      props.addItem(newTaskTittle.trim());
      setnewTaskTittle("");
    } else {
      
      setError("Tittle is required");
    }
  };

  return (
    <div>
      <input
        value={newTaskTittle}
        onChange={onNewTittleChangeHandler}
        onKeyPress={onKeyPressHendler}
        className={error ? "error" : ""} />

      <button onClick={addTask}>+</button>
      {error && <div className="error-message"> {error} </div>}
    </div>
  );
}
