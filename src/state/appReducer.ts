import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {removeTaskAC} from "./tasksReducer";

const initialState: initialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
           state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{value: boolean}>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions

//thunk
export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))

            } else {

            }
            dispatch(setAppInitializedAC({value: true}))
        })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если произойдет глобальная ошибка - мы запишем сообщение сюда
    error: string | null
    // true когда приложение проинициализировалось
    isInitialized: boolean
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionsType = ReturnType<typeof setAppErrorAC>