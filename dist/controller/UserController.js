"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
//needed to use @root for simpler callings
require("module-alias/register");
//calls our model for DB operations
const User_1 = require("@root/models/User");
//cryptography for password validation
const bcrypt_1 = __importDefault(require("bcrypt"));
//jsonwebtoken for login validation
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//class starts
class UserController {
    static async index(req, res) {
        res.status(200).json({
            "hello": "Welcome"
        });
    }
    static async createUser(req, res) {
        const user = new User_1.User();
        try {
            await user.createUser(req.body.first_name, req.body.last_name, req.body.gender, req.body.date_of_birth, req.body.email, req.body.password);
            res.status(201).send({ "message": "User Created" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }
    static async updateUserEmail(req, res) {
        const user = new User_1.User();
        try {
            await user.updateUserEmail(req.body.id, req.body.email);
            res.status(201).send({ "message": "User Updated" });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }
    static async deleteUser(req, res) {
        const user = new User_1.User();
        //avoid catches if it sends the wrong param
        if (!req.body.id) {
            res.status(400).send({ "message": "User ID not provided" });
            return;
        }
        //runs query
        try {
            await user.deleteUser(req.body.id);
            res.status(201).send({ "message": "User Deleted" });
        }
        //catches erros
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).send({ "message": "something went wrong" });
            }
        }
    }
    //generates key for JWT
    // private static async keyGenerator(len: number): Promise<string> {
    //     const generateRandomBytes = promisify(randomBytes);
    //     const buffer = await generateRandomBytes(len);
    //     return buffer.toString('hex');
    // }
    static async login(req, res) {
        const user = new User_1.User();
        //validates if it received everything
        if (!req.body.password || !req.body.email) {
            res.status(400).send({ "message": "credentials not received" });
            return;
        }
        //makes the query
        const userData = await user.selectLogin(req.body.email);
        //error treatment
        if (!userData) {
            res.status(404).send({ "message": "User not found" });
            return;
        }
        //validates the hashed password
        const passwordIsValid = await bcrypt_1.default.compare(req.body.password, userData.password);
        //validates the login
        if (passwordIsValid) {
            //alocates the request value into the cosnt email
            const email = req.body.email;
            //generates the secretKey
            //const secretkey = await UserController.keyGenerator(20) //this is how a static method is called
            const token = jsonwebtoken_1.default.sign(email, process.env.JWT_SECRET_KEY);
            //send the token to the request
            res.status(200).send({ token });
        }
        else {
            res.status(401).send({ "message": "Invalid credentials" });
        }
    }
}
exports.UserController = UserController;
