import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2c859de2-2d1d-4c0a-9243-c7ccd793b6fc'
    }
})


export type UpdateTaskPropertiesType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorityes
    startDate: string
    deadline: string
}

// api
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
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, properties: UpdateTaskPropertiesType) {
        return instance.put<UpdateCreateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

export const authAPI = {
    login(data: LoginsParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')}
}

// types
export type LoginsParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: D
}
type UpdateCreateTaskResponseType = {
    data: { items: TaskType }
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorityes {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorityes
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}
type GetTasksResponseType = {
    items: TaskType[]
    error: null | string
    totalCount: number
}
type DeleteTaskResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}