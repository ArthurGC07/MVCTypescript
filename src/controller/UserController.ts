import { Request, Response } from "express";
import { QueryObject } from "../models/QueryObject";

export class UserController{

    static async index(req: Request, res: Response): Promise<void> {
        
        const obj = new QueryObject("Arthur", 10);
        
        res.status(200).json({
            "name" : obj.userName(),
            "sum" : obj.maisDez(),
        });
    }
}