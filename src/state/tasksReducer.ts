import {v1} from "uuid";
import {addTodolistAC, removeTodoListAC} from "./todolisisReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type tasksReducerActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodoListAC>


export const tasksReducer = (state: TasksStateType, action: tasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.newTaskTitle,
                    isDone: false
                }, ...state[action.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.newIsDone
                } : t)
            }
        case "CANGE-TASK-TITLE":
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.changedTitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.newTodolistId]:[]}
        default:
            return state
    }
}


export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        todoListId,
        taskId
    } as const
}

export const addTaskAC = (todoListId: string, newTaskTitle: string) => {
    return {
        type: "ADD-TASK",
        todoListId,
        newTaskTitle
    } as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todoListId,
        taskId,
        newIsDone
    } as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, changedTitle: string) => {
    return {
        type: "CANGE-TASK-TITLE",
        todoListId,
        taskId,
        changedTitle
    } as const
}
