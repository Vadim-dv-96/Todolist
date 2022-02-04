import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./components/todolist/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string;
  tittle: string;
  filter: FilterValuesType;
};

function App() {
  function removeTask(id: string, todolistid: string) {
    let tasks = tasksObj[todolistid];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistid] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(tittle: string, todolistid: string) {
    let newTask = { id: v1(), tittle: tittle, isDone: false };
    let tasks = tasksObj[todolistid];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistid] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistid: string) {
    let todolist = todolists.find((tl) => tl.id === todolistid);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistid: string) {
    let tasks = tasksObj[todolistid];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  let todolistid1 = v1();
  let todolistid2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistid1, tittle: "What to learn", filter: "active" },
    { id: todolistid2, tittle: "What to buy", filter: "completed" },
  ]);

  let removeTodolist = (todolistid: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistid);
    setTodolists(filteredTodolist)
    delete tasksObj[todolistid]
    setTasks({...tasksObj})
  };

  let [tasksObj, setTasks] = useState({
    [todolistid1]: [
      { id: v1(), tittle: "CSS", isDone: true },
      { id: v1(), tittle: "JS", isDone: true },
      { id: v1(), tittle: "React", isDone: false },
      { id: v1(), tittle: "Redux", isDone: false },
    ],
    [todolistid2]: [
      { id: v1(), tittle: "Book", isDone: true },
      { id: v1(), tittle: "Milk", isDone: false },
    ],
  });

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
        }

        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
        }

        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            tittle={tl.tittle}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
