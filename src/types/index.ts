import { Request } from 'express'

export interface RegisterRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    }
}

export interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}

export interface CreateTaskRequest extends Request {
    body: {
        title: string;
        description?: string;
    },
}

export interface UserTasksRequest extends Request {
    params: {
        userId: string;
    }
}

export interface UpdateTaskCompilationRequest extends Request {
    params: {
        id: string;
    },
    body: {
        isCompleted: boolean;
    },
}