import express, { Router } from "express";
import * as suppliersController from "../controllers/suppliers.controller.js";

const router = express.Router();

router.get("/get-suppliers", suppliersController.getSuppliers);

export default router;

// version 1
