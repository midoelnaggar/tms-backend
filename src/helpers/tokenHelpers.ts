import jwt from "jsonwebtoken"

export const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET || "123");
};


export const verifyToken = (token: string) => {
    return jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET || "123")
}