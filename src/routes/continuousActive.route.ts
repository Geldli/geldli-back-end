import express from "express";
import ContinuousAssetController from "../controllers/continuousAsset.controller";
const router = express.Router();

router.post("/create", ContinuousAssetController.createContinuousAsset);
router.post("/getAll", ContinuousAssetController.getAllContinuousAsset);
router.post("/getById/:id", ContinuousAssetController.getContinousAssetById);
router.post(
  "/getByUserId/:id",
  ContinuousAssetController.getContinuousAssetByUserId
);
router.post(
  "/getByUserAndCategory/:id/:categoria",
  ContinuousAssetController.getContinuousAssetByUserAndCategory
);
router.post("/update", ContinuousAssetController.updateContinuousAsset);
router.post("/delete/:id", ContinuousAssetController.deleteContinuousAsset);

export default router;
