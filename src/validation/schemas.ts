import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name: yup.string().required().min(2).max(50),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
        .min(6)
        .max(128)
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
            'Valid passwords must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, and one number'
        ),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
})

export const createTaskSchema = yup.object().shape({
    title: yup.string().required().min(2).max(50),
    description: yup.string().optional(),
})
