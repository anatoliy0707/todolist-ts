import React, {useCallback} from "react"
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodoListAC } from "./state/todolisisReducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasksReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("APP")
    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const removeTask = useCallback( (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(todoListId, taskId))
    },[dispatch])

    const addTask = useCallback( (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    },[dispatch])

    const changeStatus = useCallback( (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone)) 
    },[dispatch])

    const changeTaskTitle = useCallback( (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    },[dispatch])

    const changeFilter = useCallback( (todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, value))
    },[dispatch])

    const removeTodoList = useCallback( (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    },[dispatch])

    const changeTodolistTitle = useCallback( (todoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListId, newTitle))
    },[dispatch])

    const addTodolist = useCallback( (title: string) => {
        dispatch(addTodolistAC(title))
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
