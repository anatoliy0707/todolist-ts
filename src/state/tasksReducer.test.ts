import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";

test("task should be removed", () => {
    const startState = {
        ["todolistId1"]: [
            {id: "1111", title: "HTML&CSS", isDone: true},
            {id: "1112", title: "JS", isDone: true},
            {id: "1113", title: "ReactJS", isDone: false},
        ],
        ["todolistId2"]: [
            {id: "1111", title: "Book", isDone: false},
            {id: "1112", title: "Milk", isDone: true},
            {id: "1113", title: "Car", isDone: false},
        ],
    }

    const action = removeTaskAC("todolistId1", "1112")

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState["todolistId1"][0].title).toBe("HTML&CSS")
    expect(endState["todolistId1"][1].title).toBe("ReactJS")
    expect(endState["todolistId1"].every(t => t.id !== "1112")).toBe(true)
    expect(endState["todolistId2"].length).toBe(3)
})

test("task should be added", () => {
    const startState = {
        ["todolistId1"]: [
            {id: "1111", title: "HTML&CSS", isDone: true},
            {id: "1112", title: "JS", isDone: true},
            {id: "1113", title: "ReactJS", isDone: false},
        ],
        ["todolistId2"]: [
            {id: "1111", title: "Book", isDone: false},
            {id: "1112", title: "Milk", isDone: true},
            {id: "1113", title: "Car", isDone: false},
        ],
    }
    const newTaskTitle = "iPhone"

    const action = addTaskAC("todolistId1", newTaskTitle)

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(4)
    expect(endState["todolistId1"][0].title).toBe(newTaskTitle)
    expect(endState["todolistId1"][0].isDone).toBe(false)
    expect(endState["todolistId1"][1].title).toBe("HTML&CSS")
    expect(endState["todolistId2"].every(t => t.id !== endState["todolistId1"][0].id)).toBe(true)
    expect(endState["todolistId2"].length).toBe(3)
})

test("task statys should be changed", () => {
    const startState = {
        ["todolistId1"]: [
            {id: "1111", title: "HTML&CSS", isDone: true},
            {id: "1112", title: "JS", isDone: true},
            {id: "1113", title: "ReactJS", isDone: false},
        ],
        ["todolistId2"]: [
            {id: "1111", title: "Book", isDone: false},
            {id: "1112", title: "Milk", isDone: true},
            {id: "1113", title: "Car", isDone: false},
        ],
    }
    const newStatys = false
    const taskID = "1112"

    const action = changeTaskStatusAC("todolistId1", taskID ,newStatys)

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][1].isDone).toBe(newStatys)
    expect(endState["todolistId2"][1].isDone).toBe(true)
    expect(endState["todolistId1"][1].title).toBe("JS")
    expect(endState["todolistId2"].length).toBe(3)
})

test("task title should be changed", () => {
    const startState = {
        ["todolistId1"]: [
            {id: "1111", title: "HTML&CSS", isDone: true},
            {id: "1112", title: "JS", isDone: true},
            {id: "1113", title: "ReactJS", isDone: false},
        ],
        ["todolistId2"]: [
            {id: "1111", title: "Book", isDone: false},
            {id: "1112", title: "Milk", isDone: true},
            {id: "1113", title: "Car", isDone: false},
        ],
    }
    const changedTitle = "Lada"
    const taskID = "1112"

    const action = changeTaskTitleAC("todolistId1", taskID ,changedTitle)

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][1].title).toBe(changedTitle)
    expect(endState["todolistId2"][1].title).toBe("Milk")
    expect(endState["todolistId2"].length).toBe(3)
})