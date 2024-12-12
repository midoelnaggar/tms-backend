import express from "express";
import { createTask } from "./tasks.controller";
import checkAuthMiddleware from "../../middlewares/checkAuthMiddleware";

const taskRouter = express.Router();

taskRouter.route("/create").post(checkAuthMiddleware, createTask);

export default taskRouter;