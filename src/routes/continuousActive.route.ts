import express from "express";
import ContinuousActiveController from "../controllers/continuousActive.controller";
const router = express.Router();

router.post("/create", ContinuousActiveController.createContinuousActive);
router.post("/getAll", ContinuousActiveController.getAllContinuousActive);
router.post("/getById/:id", ContinuousActiveController.getContinousActiveById);
router.post(
  "/getByUserId/:id",
  ContinuousActiveController.getContinuousActiveByUserId
);
router.post(
  "/getByUserAndCategory/:id/:categoria",
  ContinuousActiveController.getContinuousActiveByUserAndCategory
);
router.post("/update", ContinuousActiveController.updateContinuousActive);
router.post("/delete/:id", ContinuousActiveController.deleteContinuousActive);

export default router;
