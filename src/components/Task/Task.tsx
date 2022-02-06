import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import {EditableSpan} from "../EditableSpan/EditableSpan";


export type TaskPropsType = {
    removeTask: (todoListId: string, taskId: string,) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    todolistID: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task")
    const onClickHandler = () => props.removeTask(props.todolistID, props.task.id)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, props.task.id, e.currentTarget.checked)
    }

    const onChangeNewTitleHandler = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newTitle)
    },[props.changeTaskTitle, props.todolistID, props.task.id])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title} onChange={onChangeNewTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})