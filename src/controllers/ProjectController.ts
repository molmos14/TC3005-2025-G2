import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class ProjectController extends AbstractController{
    // singleton instance
    private static _instance: ProjectController;
    public static get instance(): ProjectController {
        return this._instance || (this._instance = new this("project"));
    }

    protected initRoutes() : void {
        this.router.post("/createProject",this.postCreateProject.bind(this));
        this.router.get("/listProjects", this.getListProjects.bind(this)); // esto es para listar los proyectos
    }

    public async postCreateProject(req: Request, res: Response) : Promise<void> {
        try{
            console.log(req.body);
            await db.Project.create(req.body);
            res.status(201).send("Project created successfully");
        }catch(error){
            console.error("Error creating project:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    
    private async getListProjects(req: Request, res: Response) : Promise<void> {
        try{
            const projects = await db.Project.findAll(); // db.[""]
            res.status(200).json(projects);
        }catch(error){
            console.error("Error fetching projects:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default ProjectController;