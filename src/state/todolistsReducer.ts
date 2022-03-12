import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorActionsType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialTodolistState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialTodolistState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todoListId: string, newTitle: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].title = action.payload.newTitle
        },
        changeFilterAC(state, action: PayloadAction<{ todoListId: string, value: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].filter = action.payload.value
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoListId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
    },
    extraReducers: {}
})

export const todolistsReducer = slice.reducer
export const {
    removeTodoListAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC
} = slice.actions

//thunk creators
export const setTodolistsTC = () => (dispatch: Dispatch<todolistsActionsType | SetAppStatusActionType | SetAppErrorActionsType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch<todolistsActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todoListId: todolistID, status: "loading"}))
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC({todoListId: todolistID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<todolistsActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todoListId: todoListId, newTitle: title}))
            }
        })
}

// type
export type todolistsActionsType = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}