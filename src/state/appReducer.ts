import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";

const initialState: initialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}


//action
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setAppInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    } as const
}

//thunk
export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))

            } else  {

            }
            dispatch(setAppInitializedAC(true))
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
export type SetAppErrorActionsType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType = SetAppErrorActionsType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>

