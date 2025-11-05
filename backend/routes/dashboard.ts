import express, { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/get-current-inventory", dashboardController.getCurrentInventory);
router.get(
  "/get-recent-procurement",
  dashboardController.getRecentProcurementActivities
);
router.get("/get-dashboard-summary", dashboardController.getDashboardSummary);

export default router;
