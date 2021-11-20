import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolisisReducer";

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})


export const store = createStore(RootReducer)

export type AppRootStateType = ReturnType<typeof RootReducer>