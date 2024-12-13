import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters')
        .required('Name is required'),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character')
        .required('Password is required'),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
})

export const createTaskSchema = yup.object().shape({
    title: yup.string().required().min(2).max(50),
    description: yup.string().max(550).optional(),
})

export const updateTaskSchema = yup.object().shape({
    isCompleted: yup.boolean().required()
})
