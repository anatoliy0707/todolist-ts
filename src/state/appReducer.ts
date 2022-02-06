export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    status: RequestStatusType
    error: string | null
}
export type SetAppErrorActionsType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType = SetAppErrorActionsType | SetAppStatusActionType

const initialState: initialStateType = {
    status: "idle",
    error: null
}


export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


//action creators
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
