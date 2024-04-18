// para rodar o express é necessario baixar os tipos para o express rodando o comando: npm install @types/express

import express from "express";
import { UserController } from "./controller/UserController";

const app = express();
const port = 3000;
const router = express.Router();

app.use(express.json());
app.use(router);


//user Routes
router.get("/", UserController.index);
router.post("/createuser", UserController.createUser);
router.put("/updateuser", UserController.updateUserEmail);
router.delete("/deleteuser", UserController.deleteUser);
router.get("/login", UserController.login);





//starts server
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
});