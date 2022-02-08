import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/tasksReducer";
import {TaskStatuses} from "../../api/todolist-api";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from "../../state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {TasksStateType} from "../../App";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "../../components/Todolist/Todolist";
import { Navigate } from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList = React.memo(({demo = false}: PropsType) => {

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(setTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
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

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div>
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
        </div>
    )
})