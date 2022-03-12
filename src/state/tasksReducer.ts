import {TaskPriorityes, TaskStatuses, TaskType, todolistAPI, UpdateTaskPropertiesType} from "../api/todolist-api";
import {addTodolistAC, removeTodoListAC, setTodolistsAC} from "./todolistsReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialTasksState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            state[action.payload.todoListId] = state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
    }
})

export const tasksReducer = slice.reducer

// action
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

//thunk creators
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistID}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({todoListId: todolistID, taskId: taskID}))
            }
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const currentTask = state.tasks[todoListId].find(t => t.id === taskId)
    if (!currentTask) {
        console.warn("task not found!!!")
        return
    }
    const properties: UpdateTaskPropertiesType = {
        title: currentTask.title,
        startDate: currentTask.startDate,
        priority: currentTask.priority,
        description: currentTask.description,
        deadline: currentTask.deadline,
        status: currentTask.status,
        ...model
    }
    todolistAPI.updateTask(todoListId, taskId, properties)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({todoListId, taskId, model}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorityes
    startDate?: string
    deadline?: string
}
