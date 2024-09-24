import express from "express";
import AssetController from "../controllers/asset.controller";

import authenticateToken from '../middlewares/authenticateToken.middleware';


const router = express.Router();

router.post("/create", AssetController.createAsset);
router.get("/getAll", AssetController.getAllAssets);
router.get("/getById/:id", AssetController.getAssetById);
router.get("/getByUserId", authenticateToken, AssetController.getAssetByUserId);
router.get(
  "/getByUserAndCategory/:idUser/:category",
  AssetController.getAssetByUserCategory
);
router.put("/update", AssetController.updateAsset);
router.delete("/delete/:id", AssetController.deleteAsset);

export default router;
