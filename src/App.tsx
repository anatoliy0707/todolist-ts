import React, {useCallback, useEffect} from "react"
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from "./state/todolistsReducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "./state/appReducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {


    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTodolistsTC())
    }, [])

    console.log("APP")

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(taskId, todoListId))
    }, [dispatch])

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [dispatch])

    const changeStatus = useCallback((todoListId: string, taskId: string, isDone: boolean) => {

        dispatch(updateTaskTC(todoListId, taskId, {status: isDone ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoListId, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

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
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
                <div className="progress">
                    {status === "loading" && <LinearProgress/>}
                </div>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: '20px'}} container>
                    <Paper elevation={3}>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodolist = tasks[tl.id];

                            return <Grid item>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        removeTodoList={removeTodoList}
                                        todolist={tl}
                                        key={tl.id}
                                        tasks={tasksForTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        demo={demo}
                                    />

                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
