import { Task } from "./Task";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Task Component',
  component: Task 
   };
  
const changeTaskStatusCallback = action("Status changed")
const changeTaskTittlesCallback = action("Tittle changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
  return <>
  <Task 
  task = { { id: "1", isDone: true, tittle: "CSS" } }
  changeTaskStatus = { changeTaskStatusCallback }
  changeTaskTittle = { changeTaskTittlesCallback }
  removeTask = { removeTaskCallback }
  todolistId = { "todolistId1" }
   />
   <Task 
  task = { { id: "2", isDone: false, tittle: "JS" } }
  changeTaskStatus = { changeTaskStatusCallback }
  changeTaskTittle = { changeTaskTittlesCallback }
  removeTask = { removeTaskCallback }
  todolistId = { "todolistId2" }
   />
   </> 
}



