import express from "express";
import AssetCategoryController from "../controllers/assetCategory.controller";
import cookieParser from "cookie-parser";
import authenticateToken from "../middlewares/authenticateToken.middleware";

const router = express.Router();
router.use(cookieParser());

router.post("/create", authenticateToken, AssetCategoryController.createAssetCategory);
router.get("/getAll", AssetCategoryController.getAllAssetCategory);
router.get("/getByUserId/:id", AssetCategoryController.getAssetCategoryByUser);
router.delete(
  "/delete/:idUser/:category",
  AssetCategoryController.deleteAssetCategory
);

export default router;
