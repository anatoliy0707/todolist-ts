import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
            {/*<input value={taskTitle}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*       onBlur={onBlurDiactivatedErrorHandler}*/}
            {/*/>*/}
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

            {/*<button onClick={addTaskHandler}>+</button>*/}
            <IconButton onClick={addTaskHandler} >
                <ControlPoint/>
            </IconButton>
            {/*{error && <div className="error-massage">{error}</div>}*/}
        </div>
    )
}