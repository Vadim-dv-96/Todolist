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
import { TaskType, TodoList } from "./components/todolist/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  tittle: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
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
  function changeTaskTittle(
    taskId: string,
    newTittle: string,
    todolistid: string
  ) {
    let tasks = tasksObj[todolistid];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.tittle = newTittle;
      setTasks({ ...tasksObj });
    }
  }

  function changeTodolistTittle(id: string, newTittle: string) {
    const todolist = todolists.find((todolists) => todolists.id === id);
    if (todolist) {
      todolist.tittle = newTittle;
      setTodolists([...todolists]);
    }
  }

  let todolistid1 = v1();
  let todolistid2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistid1, tittle: "What to learn", filter: "all" },
    { id: todolistid2, tittle: "What to buy", filter: "all" },
  ]);

  let removeTodolist = (todolistid: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistid);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistid];
    setTasks({ ...tasksObj });
  };

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodoList(tittle: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      tittle: tittle,
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
                (t) => t.isDone === true
              );
            }

            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item >
                <Paper style={{ padding: "10px" }} >
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
