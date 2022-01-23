import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from "./tasksReducer";
import {addTodolistAC, removeTodoListAC, setTodolistsAC} from "./todolistsReducer";
import {TasksStateType} from "../App";
import {TaskPriorityes, TaskStatuses} from "../api/todolist-api";


let startState: TasksStateType


beforeEach(() => {
    startState = {
        ["todolistId1"]: [
            {
                id: "1111", title: "HTML&CSS", status: TaskStatuses.Completed,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            },
            {
                id: "1112", title: "JS", status: TaskStatuses.Completed,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            },
            {
                id: "1113", title: "ReactJS", status: TaskStatuses.New,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1'
            },
        ],
        ["todolistId2"]: [
            {
                id: "1111", title: "Book", status: TaskStatuses.New,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId2'
            },
            {
                id: "1112", title: "Milk", status: TaskStatuses.Completed,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId2'
            },
            {
                id: "1113", title: "Car", status: TaskStatuses.New,
                order: 0, addedDate: '', deadline: '', description: '',
                priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId2'
            },
        ],
    }
})

test("task should be removed", () => {


    const action = removeTaskAC("todolistId1", "1112")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState["todolistId1"][0].title).toBe("HTML&CSS")
    expect(endState["todolistId1"][1].title).toBe("ReactJS")
    expect(endState["todolistId1"].every(t => t.id !== "1112")).toBe(true)
    expect(endState["todolistId2"].length).toBe(3)
})


test("the value by key must be removed", () => {

    const action = removeTodoListAC("todolistId1")

    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(1)
    expect(endState["todolistId1"]).toBeUndefined()
})


test("task should be added", () => {

    const action = addTaskAC({
        id: "7777",
        title: "iPhone",
        status: TaskStatuses.New,
        order: 0,
        addedDate: '',
        deadline: '',
        description: '',
        priority: TaskPriorityes.Low,
        startDate: '',
        todoListId: 'todolistId1'
    })

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId1"][0].title).toBe("iPhone")
    expect(endState["todolistId1"][0].id).toBeDefined()
    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New)
    expect(endState["todolistId1"][1].title).toBe("HTML&CSS")
    expect(endState["todolistId2"].every(t => t.id !== endState["todolistId1"][0].id)).toBe(true)
    expect(endState["todolistId2"].length).toBe(3)
})

test("task status should be changed", () => {

    const newStatus = false
    const taskID = "1112"

    const action = updateTaskAC("todolistId1", taskID, {status: false ? TaskStatuses.Completed : TaskStatuses.New})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New)
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId1"][1].title).toBe("JS")
    expect(endState["todolistId2"].length).toBe(3)
})

test("task title should be changed", () => {

    const changedTitle = "Lada"
    const taskID = "1112"

    const action = updateTaskAC("todolistId1", taskID, {title: changedTitle})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][1].title).toBe(changedTitle)
    expect(endState["todolistId2"][1].title).toBe("Milk")
    expect(endState["todolistId2"].length).toBe(3)
})

test("empty array must be added when creating a todolist", () => {

    const newTodolistTitle = "not matter"

    const action = addTodolistAC({id: "todolistId3", title: newTodolistTitle, addedDate: '', order: 0})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('empty array should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', order: 0, addedDate: '', title: 'title 1'},
        {id: '2', order: 0, addedDate: '', title: 'title 2'}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolists', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})