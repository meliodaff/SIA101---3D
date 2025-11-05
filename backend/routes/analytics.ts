import express, { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/get-metrics", analyticsController.getMetrics);

export default router;
