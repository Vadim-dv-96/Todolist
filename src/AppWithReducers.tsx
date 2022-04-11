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
import { TodoList } from "./components/todolist/TodoList";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTittleAC, FilterValuesType, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "./api/task-api";


export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  
  let todolistid1 = v1();
  let todolistid2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer( todolistsReducer, [
    { id: todolistid1, title: "What to learn", filter: "all", addedDate: "",
    order: 0 },
    { id: todolistid2, title: "What to buy", filter: "all", addedDate: "",
    order: 0 },
  ]);

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistid1]: [
      { id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistid1,
      startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
      { id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistid1,
      startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
    ],
    [todolistid2]: [
      { id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: todolistid2,
      startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
      { id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistid2,
      startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "" },
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

  function changeStatus(taskId: string, status: TaskStatuses, todolistid: string) {

    const action = changeTaskStatusAC( taskId, status, todolistid )
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

export default AppWithReducers;
