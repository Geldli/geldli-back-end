import express from "express";
import ExpenseCategoryController from "../controllers/expenseCategory.controller";
import cookieParser from "cookie-parser";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const router = express.Router();
router.use(cookieParser());

router.post("/create", authenticateToken, ExpenseCategoryController.createExpenseCategory);
router.get("/getAll", ExpenseCategoryController.getAllExpenseCategory);
router.post("/getByUserId", authenticateToken, ExpenseCategoryController.getExpenseCategoryByUser);
router.delete(
  "/delete/:idUser/:category",
  ExpenseCategoryController.deleteExpenseCategory
);

export default router;
