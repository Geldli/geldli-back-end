import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/getAll", UserController.getAllUsers);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

export default router;