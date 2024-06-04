import express from "express";
import ExpenseCategoryController from "../controllers/expenseCategory.controller";

const router = express.Router();

router.post("/create", ExpenseCategoryController.createExpenseCategory);
router.get("/getAll", ExpenseCategoryController.getAllExpenseCategory);
router.get(
  "/getByUserId/:id",
  ExpenseCategoryController.getExpenseCategoryByUser
);
router.delete("/delete/:id", ExpenseCategoryController.deleteExpenseCategory);

export default router;
