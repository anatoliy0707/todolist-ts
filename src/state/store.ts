import {applyMiddleware, combineReducers, createStore} from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";
import thunk from 'redux-thunk'
import {appReducer} from "./appReducer";
import {authReducer} from "../features/Login/authReducer";

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})


export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>



const state = store.getState()

//@ts-ignore
window.state = state