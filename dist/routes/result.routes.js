import express from "express";
import { ResultController } from "../controllers/result.controller.js";
import { authenticate } from "prime-qa-commons";
const router = express.Router();
router.post("/", authenticate, ResultController.create);
router.get("/", authenticate, ResultController.getAll);
router.get("/test/:testId", (req, res, next) => {
    req.query.testId = req.params.testId;
    next();
}, authenticate, ResultController.getAll);
router.get("/:id", authenticate, ResultController.getById);
router.put("/:id", authenticate, ResultController.update);
router.delete("/:id", authenticate, ResultController.remove);
export default router;
