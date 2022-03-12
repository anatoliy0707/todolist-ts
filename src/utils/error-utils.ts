import {setAppErrorAC, SetAppErrorActionsType, setAppStatusAC, SetAppStatusActionType} from "../state/appReducer";
import {ResponseType} from "../api/todolist-api"
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionsType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Some error occurred"}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionsType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occurred"}))
    dispatch(setAppStatusAC({status: 'failed'}))
}