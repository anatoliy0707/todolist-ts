import {addTodolistAC, todolistsReducer, TodoListType} from "./todolisisReducer";
import {tasksReducer, TasksStateType} from "./tasksReducer";

test("ids to be equal", ()=>{
    const todolistsStartState: Array<TodoListType> = []
    const tasksStartState: TasksStateType = {}

    const newTodolistTitle = "new todolist"

    const action = addTodolistAC(newTodolistTitle)

    const todolistsEndState = todolistsReducer(todolistsStartState, action)
    const tasksEndState = tasksReducer(tasksStartState, action)

    const keys = Object.keys(tasksEndState)

    const idForTasks = keys[0]
    const idForTodolists = todolistsEndState[0].id

    expect(todolistsEndState.length).toBe(1)
    expect(idForTasks && idForTodolists).toBe(action.newTodolistId)
    expect(idForTasks).toBe(idForTodolists)

})