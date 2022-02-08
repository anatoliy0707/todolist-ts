import {Dispatch} from "redux";
import {SetAppErrorActionsType, setAppStatusAC, SetAppStatusActionType} from "../../state/appReducer";
import {authAPI, LoginsParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: LoginStateType = {
    isLoggedIn: false
}

export const authReducer = (state: LoginStateType = initialState, action: loginReducerActionsType): LoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//action
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}

//thunk
export const loginTC = (data: LoginsParamsType) => (dispatch: Dispatch<loginReducerActionsType | SetAppErrorActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch<loginReducerActionsType | SetAppErrorActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
type LoginStateType = {
    isLoggedIn: boolean
}
type loginReducerActionsType = ReturnType<typeof setIsLoggedInAC>