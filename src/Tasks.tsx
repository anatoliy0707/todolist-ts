import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TasksPropsType = {
    removeTask: (todoListId: string, taskId: string,) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    todolistID: string
    task: TaskType
}
export const Tasks = React.memo((props: TasksPropsType) => {
    console.log("Task")
    const onClickHandler = () => props.removeTask(props.todolistID, props.task.id)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID, props.task.id, e.currentTarget.checked)
    }

    const onChangeNewTitleHandler = (newTitle: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newTitle)
    }

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            onChange={onChangeHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeNewTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})