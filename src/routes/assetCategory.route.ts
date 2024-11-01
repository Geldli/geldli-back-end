import express from "express";
import AssetCategoryController from "../controllers/assetCategory.controller";
import cookieParser from "cookie-parser";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const router = express.Router();
router.use(cookieParser());

router.post("/create", authenticateToken, AssetCategoryController.createAssetCategory);
router.get("/getAll", AssetCategoryController.getAllAssetCategory);
router.post("/getByUserId", authenticateToken, AssetCategoryController.getAssetCategoryByUser);
router.delete("/delete", authenticateToken, AssetCategoryController.deleteAssetCategory);

export default router;
