import {TaskPriorityes, TaskStatuses, TaskType, todolistAPI, UpdateTaskPropertiesType} from "../api/todolist-api";
import {addTodolistAC, removeTodoListAC, setTodolistsAC} from "./todolistsReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, SetAppErrorActionsType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialTasksState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: tasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistID]: action.tasks}
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "REMOVE-TODOLIST":
            // const stateCopy = {...state}
            // delete stateCopy[action.todoListId]
            // return stateCopy
            const {[action.todoListId]: del, ...rest} = state
            return rest
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                    // status: action.model ? TaskStatuses.Completed : TaskStatuses.New
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        default:
            return state
    }
}

// action creators
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        todoListId,
        taskId
    } as const
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        todoListId,
        taskId,
        model
    } as const
}

export const setTasksAC = (tasks: TaskType[], todolistID: string) => {
    return {
        type: "SET-TASKS",
        tasks,
        todolistID
    } as const
}

//thunk creators
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch<tasksReducerActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistID))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistID, taskID))
            }
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {
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
                dispatch(updateTaskAC(todoListId, taskId, model))
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
type tasksReducerActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
type ThunkDispatchType = Dispatch<tasksReducerActionsType | SetAppErrorActionsType | SetAppStatusActionType>