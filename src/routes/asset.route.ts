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
router.post("/getByUserIdAndCategory", authenticateToken, AssetController.getAssetsByUserIdAndCategory);
router.get('/assetsSum', authenticateToken, AssetController.getAssetsSumByUserId);
router.put("/update", authenticateToken, AssetController.updateAsset);
router.delete("/delete/", authenticateToken, AssetController.deleteAsset);

export default router;
