import express from "express";
import { RunController } from "../controllers/run.controller.js";
import { authenticate, genericSearch } from "prime-qa-commons";
import { RunModel } from "../models/Run.model.js";
const router = express.Router();
router.post("/", authenticate, RunController.create);
router.get("/:projectId", authenticate, RunController.getAll);
router.get("/project/:projectId", (req, res, next) => {
    req.query.projectId = req.params.projectId;
    next();
}, authenticate, RunController.getByProjectId);
router.get("/:id", authenticate, RunController.getById);
router.put("/:id", authenticate, RunController.update);
router.delete("/:id", authenticate, RunController.remove);
router.get("/search", (req, res) => genericSearch(req, res, RunModel));
export default router;
