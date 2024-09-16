import express from "express";
import continuousExpenseController from "../controllers/continuousExpense.controller";
const router = express.Router();

router.post("/create", continuousExpenseController.createContinuousExpense);
router.get("/getAll", continuousExpenseController.getAllContinuousExpense);
router.get(
  "/getById/:id",
  continuousExpenseController.getContinuousExpenseById
);
router.get(
  "/getByUserId/:id",
  continuousExpenseController.getContinuousExpenseByUserId
);
router.get(
  "/getByUserAndCategory/:id/:category",
  continuousExpenseController.getContinuousExpenseByUserAndCategory
);
router.put("/update", continuousExpenseController.updateContinuousExpense);
router.delete(
  "/delete/:id",
  continuousExpenseController.deleteContinuousExpense
);

export default router;
