import express from "express";
import UserController from "../controllers/user.controller";
import cookieParser from "cookie-parser";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const router = express.Router();

router.use(cookieParser());

router.get("/getAll", UserController.getAllUsers); // TODO Deprecate this; this route should only be used for testing
router.get("/getUserFoto/:id", UserController.getUserFoto);
router.post("/getUserData", authenticateToken, UserController.getUserById);
router.post("/create", UserController.createUser);
// router.post("/findUser", authenticateToken, UserController.getUserById);
router.post("/userExists", UserController.userExists);
router.post("/emailUsernameExist", UserController.emailUsernameExist);
router.post("/login", UserController.tryLogin);
router.post("/logout", authenticateToken, UserController.logout);
router.put("/update/:id", UserController.updateUser);
router.put("/updateFoto/:id", UserController.updateUserFoto);
router.delete("/delete/:id", UserController.deleteUser);

export default router;
