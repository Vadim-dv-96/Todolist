import  { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./components/todolist/TodoList";


export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([

    { id: v1(), tittle: "CSS", isDone:false  },
    { id: v1(), tittle: "JS", isDone: false },
    { id: v1(), tittle: "React", isDone: false },
    { id: v1(), tittle: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(tittle: string) {
    let newTask = { id: v1(), tittle: tittle, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  

  function changeStatus( taskId:string, isDone:boolean ) {
    let task = tasks.find( (t) => t.id === taskId )
    if ( task ) {
      task.isDone = isDone
    }
    setTasks( [ ...tasks ] );
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        tittle="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={ changeStatus }
        filter={ filter }
      />
    </div>
  );
}

export default App;
