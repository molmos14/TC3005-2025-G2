import { Request, Response } from 'express';
import AbstractController from './AbstractController';
import db from '../models';

class CollaboratorController extends AbstractController{
    // singleton instance
    // this ensures that only one instance of the controller is created
    private static _instance: CollaboratorController;
    public static get instance(): CollaboratorController {
        return this._instance || (this._instance = new this("collaborator"));
    }

    protected initRoutes(): void {
        this.router.post("/createCollaborator", this.postCreateCollaborator.bind(this));
        this.router.get("/listCollaborators", this.getListCollaborators.bind(this)); // esto es para listar los colaboradores
    }

    private async postCreateCollaborator(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            await db.Collaborator.create(req.body);
            res.status(201).send("Collaborator created successfully");
        } catch (error) {
            console.error("Error creating collaborator:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    private async getListCollaborators(req: Request, res: Response): Promise<void> {
        try {
            const collaborators = await db.Collaborator.findAll(); // db.[""]
            res.status(200).json(collaborators);
        } catch (error) {
            console.error("Error fetching collaborators:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default CollaboratorController;