import express, { Router } from "express";
import * as indexController from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", indexController.returnHelloWorld);

export default router;
