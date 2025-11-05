import express, { Router } from "express";
import * as requisitionsController from "../controllers/requisitions.controller.js";

const router = express.Router();

router.get("/get-requisitions", requisitionsController.getRequisitions);

export default router;
