import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { TaskPriorityes, TaskStatuses } from "../api/todolist-api";
import { AppRootStateType} from "./store";
import { tasksReducer } from "./tasksReducer";
import { todolistsReducer } from "./todolistsReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
 })
 
 const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, 
            order: 0, addedDate: '', deadline: null, description: '', 
            priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, 
            order: 0, addedDate: '', deadline: null, description: '', 
            priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, 
            order: 0, addedDate: '', deadline: null, description: '', 
            priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, 
            order: 0, addedDate: '', deadline: null, description: '', 
            priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'}
        ]
    }
 };
 
 export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>