import React, {useCallback, useEffect} from "react"
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    console.log("APP")

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
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
                                        todolistID={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
