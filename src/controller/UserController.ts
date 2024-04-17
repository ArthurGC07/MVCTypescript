require("module-alias/register")
import { Request, Response } from "express";
import { User } from "@root/models/User";

export class UserController{

    static async index(req: Request, res: Response): Promise<void> {
        
        res.status(200).json({
            "hello":"Welcome"
        });

    }

    static async createUser(req: Request, res: Response): Promise<void> {
        
        const user = new User();
        try{
            await user.createUser(
                req.body.first_name, 
                req.body.last_name,
                req.body.gender,
                req.body.date_of_birth,
                req.body.email);

            res.status(201).send({"message": "User Created"});  
        }
        catch(error:unknown){
            if(error instanceof Error){
                console.log(error.message)
                res.status(500).send({"message": "something went wrong"});
            }
        }
    }

}