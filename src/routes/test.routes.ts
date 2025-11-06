import express from "express";
import { TestController } from "../controllers/test.controller.js";
import { authenticate } from "prime-qa-commons";

const router = express.Router();

router.post("/", authenticate, TestController.create);
router.get("/", authenticate, TestController.getAll);
router.get("/run/:runId", (req, res, next) => {
  req.query.runId = req.params.runId;
  next();
}, authenticate, TestController.getAll);
router.get("/:id", authenticate, TestController.getById);
router.put("/:id", authenticate, TestController.update);
router.delete("/:id", authenticate, TestController.remove);

export default router;
