"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const QueryObject_1 = require("../models/QueryObject");
class UserController {
    static async index(req, res) {
        const obj = new QueryObject_1.QueryObject("Arthur", 10);
        res.status(200).json({
            "name": obj.userName(),
            "sum": obj.maisDez(),
        });
    }
}
exports.UserController = UserController;
