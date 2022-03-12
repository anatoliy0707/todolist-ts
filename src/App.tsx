import React, {useCallback, useEffect} from "react"
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolist-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from "@mui/material/LinearProgress";
import {initializedAppTC, RequestStatusType} from "./state/appReducer";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {logoutTC} from "./features/Login/authReducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logOutHandler} color={"inherit"}>Log out</Button>}
                </Toolbar>
                <div className="progress">
                    {status === "loading" && <LinearProgress/>}
                </div>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
