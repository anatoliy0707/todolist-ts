import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';


export type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({disabled = false, ...props}: AddItemFormPropsType) => {
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
                       disabled={disabled}
            />
            <IconButton onClick={addTaskHandler} color="primary" disabled={disabled}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    )
})