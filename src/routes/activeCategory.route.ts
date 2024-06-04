import express from "express";
import ActiveCategoryController from "../controllers/activeCategory.controller";

const router = express.Router();

router.post("/create", ActiveCategoryController.createActiveCategory);
router.get("/getAll", ActiveCategoryController.getAllActiveCategory);
router.get(
  "/getByUserId/:id",
  ActiveCategoryController.getActiveCategoryByUser
);
router.delete("/delete/:id", ActiveCategoryController.deleteActiveCategory);

export default router;
