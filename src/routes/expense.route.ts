import express from "express";
import ExpenseController from "../controllers/expense.controller";

const router = express.Router();

router.post("/create", ExpenseController.createExpense);
router.get("/getAll", ExpenseController.getAllExpenses);
router.get("/getById/:id", ExpenseController.getExpenseByID);
router.get("/getByUserId/:id", ExpenseController.getExpensesByUserID);
router.get("/getByUserAndCategory/:id/:categoria", ExpenseController.getExpensesByUserCategory);
router.put("/update", ExpenseController.updateExpense);
router.delete("/delete", ExpenseController.deleteExpense);


export default router;