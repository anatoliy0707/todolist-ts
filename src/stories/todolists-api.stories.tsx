import React, { useEffect, useState } from 'react'
import { todolistAPI, UpdateTaskPropertiesType } from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("newTodolistYoYo")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e9d129dd-7998-4da0-a7cf-e078e631ca63';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cd57bd22-f010-43cd-a782-b23e3ad7d872'
        todolistAPI.updateTodolist(todolistId, 'REACT>>>>>>>>>')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cd57bd22-f010-43cd-a782-b23e3ad7d872'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cd57bd22-f010-43cd-a782-b23e3ad7d872'
        const title = 'NewTask-HaHa'
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cd57bd22-f010-43cd-a782-b23e3ad7d872'
        const taskId = 'cb5fee6e-eae2-453b-8507-93d0eb01627f'
        const param: UpdateTaskPropertiesType = {
            
            deadline: '',
            description: '',
            priority: 5,
            startDate: '',
            status: 3,
            title: 'NeHaHa-YOYO'
        }
        todolistAPI.updateTask(todolistId, taskId, { ...param })
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cd57bd22-f010-43cd-a782-b23e3ad7d872';
        const taskId = 'ac33dc13-a209-425a-90cc-0f0e6f09d701'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}