import React, { useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Tasks} from "./Tasks";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    removeTask: (todoListId: string, taskId: string,) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist")

    const onAllClickHandler = useCallback( () => {
        props.changeFilter(props.todolistID, "all")
    }, [props.changeFilter, props.todolistID])

    const onActiveClickHandler = useCallback( () => {
        props.changeFilter(props.todolistID, "active")
    }, [props.changeFilter, props.todolistID])

    const onCompletedClickHandler = useCallback( () => {
        props.changeFilter(props.todolistID, "completed")
    }, [props.changeFilter, props.todolistID])

    const removeTodolist = () => {
        props.removeTodoList(props.todolistID)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    const changeTodolistTitle = useCallback( (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    },[props.changeTodolistTitle, props.todolistID])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Tasks removeTask={props.removeTask}
                               changeTaskStatus={props.changeTaskStatus}
                               changeTaskTitle={props.changeTaskTitle}
                               todolistID={props.todolistID}
                               task={t}
                               key={t.id}
                        />
                    )
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"}
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})


