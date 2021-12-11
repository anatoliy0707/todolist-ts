import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void

}

export const  AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            props.addItem(taskTitle.trim())
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onBlurDiactivatedErrorHandler = () => {
        setError(null)
    }

    return (
        <div>
            <TextField value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       onBlur={onBlurDiactivatedErrorHandler}
                       variant="outlined"
                       label={'Type value'}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} >
                <ControlPoint/>
            </IconButton>
        </div>
    )
} )