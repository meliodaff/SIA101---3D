import express, { Router } from "express";
import * as indexController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/get-current-inventory", indexController.getCurrentInventory);

export default router;
