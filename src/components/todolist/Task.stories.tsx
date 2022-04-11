import { Task } from "./Task";
import { action } from '@storybook/addon-actions';
import { TaskPriorities, TaskStatuses } from "../../api/task-api";

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
      task={{
        id: "1", status: TaskStatuses.Completed, title: "CSS",
        todoListId: "1",
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTittle={changeTaskTittlesCallback}
      removeTask={removeTaskCallback}
      todolistId={"todolistId1"}
    />
    <Task
      task={{
        id: "2", status: TaskStatuses.New, title: "JS",
        todoListId: "2",
        startDate: "", deadline: "", addedDate: "", order: 0,
        priority: TaskPriorities.Low, description: ""
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTittle={changeTaskTittlesCallback}
      removeTask={removeTaskCallback}
      todolistId={"todolistId2"}
    />
  </>
}



