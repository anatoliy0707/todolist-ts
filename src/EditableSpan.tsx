import React, {ChangeEvent, useState} from 'react'
import {TextField} from "@mui/material";



type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [editableTitle, setEditableTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setEditableTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(editableTitle)
    }
    const onChangeEditableHandler = (e: ChangeEvent<HTMLInputElement>) => setEditableTitle(e.currentTarget.value)

return (
    editMode
        ? <TextField variant={"filled"} onBlur={activateViewMode} value={editableTitle} onChange={onChangeEditableHandler} autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
)
}