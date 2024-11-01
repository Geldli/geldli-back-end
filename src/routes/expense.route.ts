import express from "express";
import ExpenseController from "../controllers/expense.controller";
import authenticateToken from "../middlewares/authenticateToken.middleware";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

router.post("/create", authenticateToken, ExpenseController.createExpense);
router.get("/getAll", ExpenseController.getAllExpenses);
router.get("/getById/:id", ExpenseController.getExpenseByID);
router.post("/getByUserId", authenticateToken, ExpenseController.getExpensesByUserID);
router.post("/getByUserIdAndCategory", authenticateToken, ExpenseController.getExpensesByUserIdAndCategory);
router.get('/expensesSum', authenticateToken, ExpenseController.getexpenseSumByUserId);
router.put("/update", authenticateToken, ExpenseController.updateExpense);
router.delete("/delete", authenticateToken, ExpenseController.deleteExpense);

export default router;
