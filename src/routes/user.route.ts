import express from "express";
import UserController from "../controllers/user.controller";
import cookieParser from 'cookie-parser';

const router = express.Router();

router.use(cookieParser());

router.post("/create", UserController.createUser);
router.post("/findUser", UserController.getUserByUsernameOrEmail);
router.post("/userExists", UserController.userExists);
router.post("/login", UserController.tryLogin);
// router.get("/email/:email", UserController.getUserByEmail);
router.get("/getAll", UserController.getAllUsers);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

export default router;
