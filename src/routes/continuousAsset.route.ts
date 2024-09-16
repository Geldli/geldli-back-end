import express from "express";
import ContinuousAssetController from "../controllers/continuousAsset.controller";
const router = express.Router();

router.post("/create", ContinuousAssetController.createContinuousAsset);
router.get("/getAll", ContinuousAssetController.getAllContinuousAsset);
router.get("/getById/:id", ContinuousAssetController.getContinousAssetById);
router.get(
  "/getByUserId/:id",
  ContinuousAssetController.getContinuousAssetByUserId
);
router.get(
  "/getByUserAndCategory/:id/:category",
  ContinuousAssetController.getContinuousAssetByUserAndCategory
);
router.put("/update", ContinuousAssetController.updateContinuousAsset);
router.delete("/delete/:id", ContinuousAssetController.deleteContinuousAsset);

export default router;
