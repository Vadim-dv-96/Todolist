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
import "./App.css";
import { AddItemForm } from "./components/todolist/AddItemForm";
import { TodoList } from "./components/todolist/TodoList";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTittleAC, FilterValuesType, removeTodolistAC, TodolistDomainType } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";
import { TaskStatuses, TaskType } from "./api/task-api";


export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  console.log("App is called");
  

  const dispatch = useDispatch();
  
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>( state => state.todolists )
  const tasksObj = useSelector<AppRootState, TasksStateType>( state => state.tasks )


  const removeTask = useCallback( function (id: string, todolistid: string) {

    const action = removeTaskAC( id, todolistid )
    dispatch(action)
    
  },[dispatch])

  const addTask = useCallback( function (tittle: string, todolistid: string) {

    const action = addTaskAC( tittle, todolistid )
    dispatch(action)
    
  },[dispatch])

  const changeStatus = useCallback( function (taskId: string, status: TaskStatuses, todolistid: string) {

    const action = changeTaskStatusAC( taskId, status, todolistid )
    dispatch(action)
    
  },[dispatch])

  const changeTaskTittle = useCallback( function (taskId: string, newTittle: string, todolistid: string) {

    const action = changeTaskTitleAC( taskId, newTittle, todolistid )
    dispatch(action)
    
  },[dispatch])

  const changeFilter = useCallback( function (value: FilterValuesType, todolistid: string) {

    const action = changeTodolistFilterAC( value, todolistid )
    dispatch(action)
    
  },[dispatch])

  const removeTodolist = useCallback( (todolistid: string) => {

    const action = removeTodolistAC( todolistid )
    dispatch(action)
  },[dispatch])

  const changeTodolistTittle = useCallback( function (id: string, newTittle: string) {

    const action = changeTodolistTittleAC( id, newTittle )
    dispatch(action)
    
  },[dispatch])

  const addTodoList = useCallback( (tittle: string) => {

    const action = addTodolistAC( tittle )
    dispatch(action);
  }, [dispatch] );

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
            let allTodolistTasks = tasksObj[tl.id];
            let tasksForTodolist = allTodolistTasks;
            

            return (
              <Grid key={tl.id} item >
                <Paper style={{ padding: "10px" }} >
              <TodoList
                
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

export default AppWithRedux;
