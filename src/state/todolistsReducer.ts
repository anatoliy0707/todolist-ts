import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialTodolistState: TodolistDomainType[] = []

export type todolistsActionsType = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>


export const todolistsReducer = (state: Array<TodolistDomainType> = initialTodolistState, action: todolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state
    }
}

// action creators
export const changeFilterAC = (todoListId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        todoListId,
        value
    } as const
}

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId
    } as const
}

export const changeTodolistTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId,
        newTitle
    } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: "ADD-TODOLIST",
        todolist
    } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: "SET-TODOLISTS",
        todolists
    } as const
}

//thunk creators
export const setTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todolistID))
            }
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todoListId, title))
            }
        })
}