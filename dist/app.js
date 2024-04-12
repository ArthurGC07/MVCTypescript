"use strict";
// para rodar o express é necessario baixar os tipos para o express rodando o comando: npm install @types/express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./controller/UserController");
const app = (0, express_1.default)();
const port = 3000;
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(router);
//routes
router.get("/", UserController_1.UserController.index);
//starts server
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
