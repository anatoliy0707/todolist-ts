import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodoListAC,
    todolistsReducer,
    TodoListType
} from "./todolisisReducer";

test('todolist filter should be changed', () => {

    const startState: Array<TodoListType> = [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ]

    const newFilterValue: FilterValuesType = "completed"

    const action = changeFilterAC('todolistId1', newFilterValue)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilterValue)
    expect(endState[1].filter).toBe("all")
    expect(endState.length).toBe(2)
})

test('todolist  should be changed removed', () => {

    const startState: Array<TodoListType> = [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ]

    const action = removeTodoListAC('todolistId1')

    const endState = todolistsReducer(startState, action)

    expect(endState[0].id).toBe("todolistId2")
    expect(Object.keys(endState[0]).length).toBe(3)
    expect(endState.length).toBe(1)
})

test('todolist title should be changed', () => {

    const startState: Array<TodoListType> = [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ]
    const newTitle = "YoYo"

    const action = changeTodolistTitleAC('todolistId1', newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")
    expect(Object.keys(endState[0]).length).toBe(3)
})

test('todolist should be added', () => {

    const startState: Array<TodoListType> = [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ]
    const newTitle = "i'am new todolist"

    const action = addTodolistAC(newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe(newTitle)
    expect(endState.length).toBe(3)
    expect(Object.keys(endState[0]).length).toBe(3)
})

