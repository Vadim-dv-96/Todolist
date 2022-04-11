import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/todolist/AddItemForm";
import { TodoList } from "./components/todolist/TodoList";
import { TaskPriorities, TaskStatuses, TaskType } from "./api/task-api";
import { FilterValuesType, TodolistDomainType } from "./state/todolists-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {

  let todolistid1 = v1();
  let todolistid2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {
      id: todolistid1, title: "What to learn", filter: "all", addedDate: "",
      order: 0
    },
    {
      id: todolistid2, title: "What to buy", filter: "all", addedDate: "",
      order: 0
    },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistid1]: [
      {
        id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistid1,
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
      },
      {
        id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistid1,
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
      },
    ],
    [todolistid2]: [
      {
        id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: todolistid2,
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
      },
      {
        id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistid2,
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
      },
    ],
  });

  function removeTask(id: string, todolistid: string) {
    let tasks = tasksObj[todolistid];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistid] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(tittle: string, todolistid: string) {
    let newTask = {
      id: v1(), title: tittle, status: TaskStatuses.New, todoListId: todolistid,
      startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""
    };
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

  function changeStatus(taskId: string, status: TaskStatuses, todolistid: string) {
    let tasks = tasksObj[todolistid];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = status;
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTittle(
    taskId: string,
    newTittle: string,
    todolistid: string
  ) {
    let tasks = tasksObj[todolistid];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTittle;
      setTasks({ ...tasksObj });
    }
  }

  function changeTodolistTittle(id: string, newTittle: string) {
    const todolist = todolists.find((todolists) => todolists.id === id);
    if (todolist) {
      todolist.title = newTittle;
      setTodolists([...todolists]);
    }
  }


  let removeTodolist = (todolistid: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistid);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistid];
    setTasks({ ...tasksObj });
  };

  function addTodoList(tittle: string) {
    let todolist: TodolistDomainType = {
      id: v1(),
      filter: "all",
      title: tittle,
      addedDate: "",
      order: 0
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }} >
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={3} >

          {todolists.map((tl) => {

            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.status === TaskStatuses.Completed
              );
            }

            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.status === TaskStatuses.New
              );
            }

            return (
              <Grid item >
                <Paper style={{ padding: "10px" }} >
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    tittle={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTittle={changeTaskTittle}
                    changeTodolistTittle={changeTodolistTittle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
