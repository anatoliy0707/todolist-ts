import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type todolistsActionsType = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof addTodolistAC>


export const todolistsReducer = (state: Array<TodoListType>, action: todolistsActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        case "ADD-TODOLIST":
            return [{id: v1(), title: action.newTitle, filter: "all"}, ...state]
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
        newTitle
    } as const
}

