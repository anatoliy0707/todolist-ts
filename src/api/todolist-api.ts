import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2c859de2-2d1d-4c0a-9243-c7ccd793b6fc'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: D
}

type TaskType = {
    addedDate: string
    deadline: null 
    description: string
    id: string
    order: number
    priority: number
    startDate: null | string
    status: number
    title: string
    todoListId: string
}

type GetTasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

type UpdateCreateTaskResponseType = {
    data: { items: TaskType[] }
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type DeleteTaskResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}

export type UpdateTaskPropertiesType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },

    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<UpdateCreateTaskResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, properties: UpdateTaskPropertiesType) {
        return instance.put<UpdateCreateTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, properties)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}
