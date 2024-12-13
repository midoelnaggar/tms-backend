import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/tokenHelpers";
import AppError from "../helpers/appError";
import { findUserById } from "../components/users/users.repository";


const checkAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        next(new AppError("No token provided", 400))
    }
    else {
        try {
            const decodedUserId = verifyToken(token);
            const user = await findUserById(String(decodedUserId))
            if (!user) {
                next(new AppError("Unable to find the user", 404));
            }
            res.locals.userId = decodedUserId;
            next();
        } catch (err) {
            next(new AppError("Invalid token", 403))
        }
    }
}

export default checkAuthMiddleware;