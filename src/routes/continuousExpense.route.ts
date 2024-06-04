import express from "express";
import continuousExpenseController from "../controllers/continuousExpense.controller";
const router = express.Router();

router.post("/create", continuousExpenseController.createContinuousExpense);
router.post("/getAll", continuousExpenseController.getAllContinuousExpense);
router.post(
  "/getById/:id",
  continuousExpenseController.getContinuousExpenseById
);
router.post(
  "/getByUserId/:id",
  continuousExpenseController.getContinuousExpenseByUserId
);
router.post(
  "/getByUserAndCategory/:id/:categoria",
  continuousExpenseController.getContinuousExpenseByUserAndCategory
);
router.post("/update", continuousExpenseController.updateContinuousExpense);
router.post("/delete/:id", continuousExpenseController.deleteContinuousExpense);

export default router;
