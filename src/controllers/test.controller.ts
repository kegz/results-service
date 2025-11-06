import { Request, Response } from "express";
import { TestModel } from "../models/Test.model.js";
import { RunModel } from "../models/Run.model.js";
import { errorResponse, successResponse } from "prime-qa-commons";

export const TestController = {
  // 🟢 Create a new Test (auto-link projectId from Run)
  async create(req: Request, res: Response) {
    try {
      const { runId, testCaseId, title, suiteId, sectionId } = req.body;

      const run = await RunModel.findById(runId);
      
      if (!run) return res.json(errorResponse("not found"));

      const test = await TestModel.create({
        runId,
        projectId: run.projectId,
        testCaseId,
        suiteId,
        sectionId,
        title,
      });

      return res.json(successResponse(test));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟢 Get all Tests (optionally filter by runId)
  async getAll(req: Request, res: Response) {
    try {
      const { runId } = req.query;
      const filter = { isActive: true, ...(runId ? { runId } : {}) };
      const tests = await TestModel.find(filter).sort({ createdAt: -1 });
      return res.json(successResponse(tests));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟢 Get single Test
  async getById(req: Request, res: Response) {
    try {
      const test = await TestModel.findById(req.params.id);
      if (!test) return res.json(errorResponse("not found"));
      return res.json(successResponse(test));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟡 Update Test
  async update(req: Request, res: Response) {
    try {
      const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!test) return res.json(errorResponse("not found"));
      return res.json(successResponse(test));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🔴 Soft Delete
  async remove(req: Request, res: Response) {
    try {
      const test = await TestModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!test) return res.json(errorResponse("not found"));
      return res.json(successResponse(test));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },
};
