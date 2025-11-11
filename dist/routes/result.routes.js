import express from "express";
import { ResultController } from "../controllers/result.controller.js";
import { authenticate, genericSearch } from "prime-qa-commons";
import { ResultModel } from "../models/Result.model.js";
const router = express.Router();
router.post("/", authenticate, ResultController.create);
router.get("/", authenticate, ResultController.getAll);
router.get("/test/:testId", (req, res, next) => {
    req.query.testId = req.params.testId;
    next();
}, authenticate, ResultController.getAll);
router.get("/project/:projectId", (req, res, next) => {
    req.query.projectId = req.params.projectId;
    next();
}, authenticate, ResultController.getByProjectId);
router.get("/:id", authenticate, ResultController.getById);
router.put("/:id", authenticate, ResultController.update);
router.delete("/:id", authenticate, ResultController.remove);
router.get("/search", (req, res) => genericSearch(req, res, ResultModel));
export default router;
