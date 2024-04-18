//needed to use @root for simpler callings
require("module-alias/register")

//express for building APIs
import { Request, Response } from "express";

//calls our model for DB operations
import { User } from "@root/models/User";

//cryptography for password validation
import bcrypt from 'bcrypt';

//jsonwebtoken for login validation
import jwt from 'jsonwebtoken';

//libraries needed for generating a secret key for JWT using crypto
//crypto generates the key and promisify transform it into a promise
import { generateKey, randomBytes } from "crypto";
import { promisify } from "util";


//class starts
export class UserController {


    static async index(req: Request, res: Response): Promise<void> {

        res.status(200).json({
            "hello": "Welcome"
        });

    }

    static async createUser(req: Request, res: Response): Promise<void> {

        const user = new User();
        try {
            await user.createUser(
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.date_of_birth,
                req.body.email,
                req.body.password,
            );

            res.status(201).send({ "message": "User Created" });
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }

    static async updateUserEmail(req: Request, res: Response): Promise<void> {

        const user = new User();
        try {
            await user.updateUserEmail(
                req.body.id,
                req.body.email);

            res.status(201).send({ "message": "User Updated" });
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {

        const user = new User();

        //avoid catches if it sends the wrong param
        if (!req.body.id) {
            res.status(400).send({ "message": "User ID not provided" })
            return;
        }
        //runs query
        try {
            await user.deleteUser(req.body.id);
            res.status(201).send({ "message": "User Deleted" });
        }
        //catches erros
        catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }

    //generates key for JWT
    private static async keyGenerator(len: number): Promise<string> {

        const generateRandomBytes = promisify(randomBytes);
        const buffer = await generateRandomBytes(len);
        return buffer.toString('hex');
    }

    static async login(req: Request, res: Response): Promise<void> {

        const user = new User();

        //validates if it received everything
        if (!req.body.password || !req.body.email) {
            res.status(400).send({ "message": "credentials not received" })
            return;
        }

        //makes the query
        const userData = await user.selectLogin(req.body.email)

        //error treatment
        if (!userData) {
            res.status(404).send({ "message": "User not found" })
            return;
        }

        //validates the hashed password
        const passwordIsValid = await bcrypt.compare(req.body.password, userData.password)

        //validates the login
        if (passwordIsValid) {
            //alocates the request value into the cosnt email
            const email = req.body.email
            //generates the secretKey
            const secretkey = await UserController.keyGenerator(20) //this is how a static method is called
            const token = jwt.sign(email, secretkey);
            //send the token to the request
            res.status(200).send({ token });
        }
        else {
            res.status(401).send({ "message": "Invalid credentials" })
        }
    }


}