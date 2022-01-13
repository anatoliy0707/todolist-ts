import {v1} from "uuid";
import { TodolistType } from "../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType =  TodolistType & {
    filter: FilterValuesType
}



const initialTodolistState: TodolistDomainType[] = []

export type todolistsActionsType = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof addTodolistAC>


export const todolistsReducer = (state: Array<TodolistDomainType> = initialTodolistState, action: todolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        case "ADD-TODOLIST":
            return [{id: action.newTodolistId, title: action.newTitle, filter: "all", addedDate: '', order: 0}, ...state]
        default:
            return state
    }
}


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

export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        newTitle,
        newTodolistId: v1()
    } as const
}

