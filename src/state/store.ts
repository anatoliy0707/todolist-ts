import {applyMiddleware, combineReducers, createStore} from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import thunk from 'redux-thunk'

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>



const state = store.getState()

//@ts-ignore
window.state = state