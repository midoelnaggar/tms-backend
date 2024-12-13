import express from "express";
import { createTask, userTasks, updateTaskStatus, deletedTask } from "./tasks.controller";
import checkAuthMiddleware from "../../middlewares/checkAuthMiddleware";

const taskRouter = express.Router();
taskRouter.use(checkAuthMiddleware)
taskRouter.route("/").post(createTask).get(userTasks);
taskRouter.route("/:id").put(updateTaskStatus).delete(deletedTask);

export default taskRouter;