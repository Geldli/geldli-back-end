import express from "express";
import AssetController from "../controllers/asset.controller";
import cookieParser from "cookie-parser";


import authenticateToken from '../middlewares/authenticateToken.middleware';


const router = express.Router();
router.use(cookieParser());

router.post("/create", authenticateToken, AssetController.createAsset);
router.get("/getAll", AssetController.getAllAssets);
router.get("/getById/:id", AssetController.getAssetById);
router.post("/getByUserId", authenticateToken, AssetController.getAssetByUserId);
router.get(
  "/getByUserAndCategory/:idUser/:category",
  AssetController.getAssetByUserCategory
);
router.get('/assetsSum', authenticateToken, AssetController.getAssetsSumByUserId);
router.put("/update", AssetController.updateAsset);
router.delete("/delete/:id", AssetController.deleteAsset);

export default router;
