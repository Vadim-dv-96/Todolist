import {
  AppBar,
  Button,
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
import { RequestStatusType } from "./state/app-reducer";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
  demo?: boolean
}

function AppWithRedux({ demo = false }: PropsType) {
  // альтернативная типизация
  // const status = useSelector((state: AppRootState): RequestStatusType => { 
  //   return state.app.status; })

  // хук для типизации useSelector
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

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

      {status === "loading" && <LinearProgress color="secondary" />}

      <Container fixed>
        <TodolistsList demo={demo}/>
      </Container>
      <ErrorSnackbar />
    </div>
  );
}

export default AppWithRedux;
