import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/tokenHelpers";
import AppError from "../helpers/appError";


const checkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        next(new AppError("No token provided", 400))
    }
    else {
        try {
            const decodedUserId = verifyToken(token);
            res.locals.userId = decodedUserId;
            next();
        } catch (err) {
            next(new AppError("Invalid token", 403))
        }
    }
}

export default checkAuthMiddleware;