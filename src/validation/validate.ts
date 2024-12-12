import yup from 'yup'
import AppError from '../helpers/appError'
import { NextFunction } from 'express';

export async function validate<T extends object>({
    schema,
    data,
    next
}: {
    schema: yup.ObjectSchema<T>;
    data: T;
    next: NextFunction
}) {
    try {
        return await schema.validate(data)
    } catch (error: unknown) {
        const validationError = error as yup.ValidationError
        next(new AppError(
            `${validationError.errors[0]}`,
            400
        ))
    }
}

