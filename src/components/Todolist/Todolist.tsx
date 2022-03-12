import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from '../../api/todolist-api';
import {FilterValuesType, TodolistDomainType} from '../../state/todolistsReducer';
import {useDispatch} from "react-redux";
import {setTasksTC} from "../../state/tasksReducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    removeTask: (todoListId: string, taskId: string,) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    console.log("Todolist")
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTasksTC(props.todolist.id))
    }, [])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "all")
    }, [props.changeFilter, props.todolist.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "active")
    }, [props.changeFilter, props.todolist.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "completed")
    }, [props.changeFilter, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodoList(props.todolist.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Task removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              todolistID={props.todolist.id}
                              task={t}
                              key={t.id}
                              entityStatys={props.todolist.entityStatus}
                        />
                    )
                })
            }
        </div>
        <div>
            <Button variant={props.todolist.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.todolist.filter === "active" ? "contained" : "text"} color={"primary"}
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.todolist.filter === "completed" ? "contained" : "text"} color={"secondary"}
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})


