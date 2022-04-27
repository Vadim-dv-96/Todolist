import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";
import { TodolistsList } from "./components/TodolistsList";
import { useAppSelector } from "./state/store";
import { initializeAppTC, RequestStatusType } from "./state/app-reducer";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "./components/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutTC } from "./components/Login/auth-reducer";

type PropsType = {
  demo?: boolean
}

function AppWithRedux({ demo = false }: PropsType) {
  // альтернативная типизация
  // const status = useSelector((state: AppRootState): RequestStatusType => { 
  //   return state.app.status; })

  // хук для типизации useSelector
  const status = useAppSelector<RequestStatusType>(state => state.app.status);
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
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

          </Typography>

          {isLoggedIn && <Button color="inherit" onClick={logoutHandler} >Logout</Button>}

        </Toolbar>

        {status === "loading" && <LinearProgress color="secondary" />}

      </AppBar>

      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList demo={demo} />} />
          <Route path="login" element={<Login />} />
          <Route path="404" element={<h1 style={{ textAlign: "center" }} >404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Container>

      <ErrorSnackbar />
    </div>
  );
}

export default AppWithRedux;
