import express, { NextFunction, Request, Response } from 'express'
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./components/users/users.router";
import AppError from './helpers/appError';
import taskRouter from './components/tasks/tasks.router';
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/tasks", taskRouter);
app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (!err.isOperational) {
        console.error('Unexpected Error:', err);
    }

    res.status(statusCode).json({
        status: 'error',
        message,
    });
});

export default app;