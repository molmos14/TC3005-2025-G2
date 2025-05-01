import { Request, Response } from 'express';
import AbstractController from './AbstractController';
import User from '../modelsNOSQL/User';


class UserController extends AbstractController{
    // singleton instance
    // this ensures that only one instance of the controller is created
    private static _instance: UserController;
    public static get instance(): UserController {
        return this._instance || (this._instance = new this("user"));
    }

    protected initRoutes(): void {
        this.router.post("/createUser", this.postCreateUser.bind(this));
        this.router.get("/listUsers", this.getListUser.bind(this)); // esto es para listar los colaboradores
    }

    private async postCreateUser(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            await User.UserManager.put(new User(req.body)); // Esto es para crear el usuario con dynamoDB
            res.status(201).send("User created successfully");
        } catch (error) {
            console.error("Error creating User:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    private async getListUser(req: Request, res: Response): Promise<void> {
        try {
            const users = (await User.UserManager.scan().run({return:"output"})).Items; // Esto es para listar los colaboradores
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching User:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default UserController;