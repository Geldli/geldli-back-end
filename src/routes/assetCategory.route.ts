import express from "express";
import AssetCategoryController from "../controllers/assetCategory.controller";

const router = express.Router();

router.post("/create", AssetCategoryController.createAssetCategory);
router.get("/getAll", AssetCategoryController.getAllAssetCategory);
router.get("/getByUserId/:id", AssetCategoryController.getAssetCategoryByUser);
router.delete(
  "/delete/:idUser/:category",
  AssetCategoryController.deleteAssetCategory
);

export default router;
