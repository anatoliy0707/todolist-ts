import React, {useReducer} from "react"
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodoListAC, todolistsReducer } from "./state/todolisisReducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    const [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Car", isDone: false},
            {id: v1(), title: "MacBooK", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ],
    })


    function removeTask(todoListId: string, taskId: string) {
        dispatchToTasks(removeTaskAC(todoListId, taskId))
    }

    function addTask(todoListId: string, title: string) {
        dispatchToTasks(addTaskAC(todoListId, title))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(todoListId, taskId, isDone)) 
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todoListId, taskId, newTitle))
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchToTodolists(changeFilterAC(todoListId, value))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchToTodolists(removeTodoListAC(todoListId))
        dispatchToTasks(removeTodoListAC(todoListId))

    }

    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todoListId, newTitle))
    }

    const addTodolist = (title: string) => {
        dispatchToTodolists(addTodolistAC(title))
        dispatchToTasks(addTodolistAC(title))
    }

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

                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }

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

export default AppWithReducers;
