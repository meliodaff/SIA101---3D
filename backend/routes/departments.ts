import express, { Router } from "express";
import * as departmentsController from "../controllers/departments.controller.js";

const router = express.Router();

router.get("/get-departments", departmentsController.getDepartments);
router.get("/get-maintenance-request", departmentsController.getMaintenanceRequest);

export default router;
