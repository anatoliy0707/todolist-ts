import React, {useState} from "react"
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = "all" | "active" | "completed";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
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
        setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].filter(f => f.id !== taskId)})
    }

    function addTask(todoListId: string, title: string) {
        setTasksObj({...tasksObj, [todoListId]: [{id: v1(), title, isDone: false}, ...tasksObj[todoListId]]})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].map(m => m.id === taskId ? {...m, isDone} : m)})
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasksObj({
            ...tasksObj,
            [todoListId]: tasksObj[todoListId].map(m => m.id === taskId ? {...m, title: newTitle} : m)
        })
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists(todolists.map(m => m.id === todoListId ? {...m, filter: value} : m))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todolists.filter(f => f.id !== todoListId))
    }

    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        setTodoLists(todolists.map(m => m.id === todoListId ? {...m, title: newTitle} : m))
    }

    const addTodolist = (title: string) => {

        const newTodolist: TodoListType = {
            id: v1(),
            title,
            filter: "all"
        }

        setTodoLists([newTodolist, ...todolists])
        setTasksObj({...tasksObj, [newTodolist.id]: []})
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

export default App;
