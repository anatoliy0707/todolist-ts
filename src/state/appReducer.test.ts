import {appReducer, initialStateType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./appReducer";

let startState: initialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})


test('correct error message should be set', () => {


    const error = "New error"

    const action = setAppErrorAC(error)

    const endState = appReducer(startState, action)

    expect(endState.error).toBe(error)
})

test('correct status should be set', () => {


    const status: RequestStatusType = 'loading'

    const action = setAppStatusAC(status)

    const endState = appReducer(startState, action)

    expect(endState.status).toBe(status)
})