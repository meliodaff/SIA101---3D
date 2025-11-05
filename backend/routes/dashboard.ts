import express, { Router } from "express";
import * as indexController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/get-current-inventory", indexController.getCurrentInventory);
router.get(
  "/get-recent-procurement",
  indexController.getRecentProcurementActivities
);
router.get("/get-dashboard-summary", indexController.getDashboardSummary);

export default router;
