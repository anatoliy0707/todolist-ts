import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {TaskPriorityes, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";
import {appReducer} from "./appReducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/authReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.New,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>