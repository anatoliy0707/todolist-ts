import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string,) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter(props.todolistID, "all")
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistID, "active")
    }

    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistID, "completed")
    }

    const removeTodolist = () => {
        props.removeTodoList(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }


    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton  onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
                    }

                    const onChangeNewTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistID, t.id, newTitle)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeNewTitleHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton  onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === "all" ? "contained" : "text"}  onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"}  onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"}  onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
}

