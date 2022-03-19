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
import { useReducer } from "react";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/todolist/AddItemForm";
import { TaskType, TodoList } from "./components/todolist/TodoList";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTittleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  tittle: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  
  let todolistid1 = v1();
  let todolistid2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer( todolistsReducer, [
    { id: todolistid1, tittle: "What to learn", filter: "all" },
    { id: todolistid2, tittle: "What to buy", filter: "all" },
  ]);

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  function removeTask(id: string, todolistid: string) {

    const action = removeTaskAC( id, todolistid )
    dispatchToTasksReducer(action)
    
  }

  function addTask(tittle: string, todolistid: string) {

    const action = addTaskAC( tittle, todolistid )
    dispatchToTasksReducer(action)
    
  }

  function changeStatus(taskId: string, isDone: boolean, todolistid: string) {

    const action = changeTaskStatusAC( taskId, isDone, todolistid )
    dispatchToTasksReducer(action)
    
  }

  function changeTaskTittle(taskId: string, newTittle: string, todolistid: string) {

    const action = changeTaskTitleAC( taskId, newTittle, todolistid )
    dispatchToTasksReducer(action)
    
  }

  function changeFilter(value: FilterValuesType, todolistid: string) {

    const action = changeTodolistFilterAC( value, todolistid )
    dispatchToTodolistsReducer(action)
    
  }

  let removeTodolist = (todolistid: string) => {

    const action = removeTodolistAC( todolistid )
    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)

  };

  function changeTodolistTittle(id: string, newTittle: string) {

    const action = changeTodolistTittleAC( id, newTittle )
    dispatchToTodolistsReducer(action)
    
  }

  function addTodoList(tittle: string) {

    const action = addTodolistAC( tittle )
    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
    
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

export default AppWithReducers;
