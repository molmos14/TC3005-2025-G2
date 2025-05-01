import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import Task from "../modelsNOSQL/Task";

class TaskController extends AbstractController {
    private static _instance: TaskController;
    public static get instance(): TaskController {
        return this._instance || (this._instance = new this("task"));
    }

    protected initRoutes(): void {
        this.router.post("/createTask", this.postCreateTask.bind(this));
        this.router.get("/listTasks", this.getListTasks.bind(this));
    }

    private async postCreateTask(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            await Task.TaskManager.put(new Task(req.body));
            res.status(201).send("Task created successfully");
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    private async getListTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = (await Task.TaskManager.scan().run({ return: "output" })).Items;
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default TaskController;