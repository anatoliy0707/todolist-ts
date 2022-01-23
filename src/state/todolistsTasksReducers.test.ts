import {addTodolistAC, TodolistDomainType, todolistsReducer,} from "./todolistsReducer";
import {tasksReducer, TasksStateType} from "./tasksReducer";

test("ids to be equal", ()=>{
    const todolistsStartState: TodolistDomainType[] = []
    const tasksStartState: TasksStateType = {}

    const newTodolistTitle = "new todolist"

    const action = addTodolistAC({id: "todolistId1", title: newTodolistTitle, addedDate: '', order: 0})

    const todolistsEndState = todolistsReducer(todolistsStartState, action)
    const tasksEndState = tasksReducer(tasksStartState, action)

    const keys = Object.keys(tasksEndState)

    const idForTasks = keys[0]
    const idForTodolists = todolistsEndState[0].id

    expect(todolistsEndState.length).toBe(1)
    expect(idForTasks).toBe(idForTodolists)
})