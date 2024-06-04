import express from "express";
import ActiveController from "../controllers/active.controller";

const router = express.Router();

router.post("/create", ActiveController.createActive);
router.get("/getAll", ActiveController.getAllActives);
router.get("/getById/:id", ActiveController.getActiveById);
router.get("/getByUserId/:id", ActiveController.getActiveByUserId);
router.get(
  "/getByUserAndCategory/:id/:categoria",
  ActiveController.getActiveByUserCategory
);
router.put("/update", ActiveController.updateActive);
router.delete("/delete/:id", ActiveController.deleteActive);

export default router;
