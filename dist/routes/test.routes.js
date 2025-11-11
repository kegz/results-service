import express from "express";
import { TestController } from "../controllers/test.controller.js";
import { authenticate, genericSearch } from "prime-qa-commons";
import { TestModel } from "../models/Test.model.js";
const router = express.Router();
router.post("/", authenticate, TestController.create);
router.get("/", authenticate, TestController.getAll);
router.get("/run/:runId", (req, res, next) => {
    req.query.runId = req.params.runId;
    next();
}, authenticate, TestController.getAll);
router.get("/project/:projectId", (req, res, next) => {
    req.query.projectId = req.params.projectId;
    next();
}, authenticate, TestController.getByProjectId);
router.get("/:id", authenticate, TestController.getById);
router.put("/:id", authenticate, TestController.update);
router.delete("/:id", authenticate, TestController.remove);
router.get("/search", (req, res) => genericSearch(req, res, TestModel));
export default router;
