"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("module-alias/register");
const User_1 = require("@root/models/User");
class UserController {
    static async index(req, res) {
        res.status(200).json({
            "hello": "Welcome"
        });
    }
    static async createUser(req, res) {
        const user = new User_1.User();
        try {
            await user.createUser(req.body.first_name, req.body.last_name, req.body.gender, req.body.date_of_birth, req.body.email);
            res.status(201).send({ "message": "User Created" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ "message": error.message });
            }
        }
    }
}
exports.UserController = UserController;
