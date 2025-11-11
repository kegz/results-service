import { Request, Response } from "express";
import { ResultModel } from "../models/Result.model.js";
import { TestModel } from "../models/Test.model.js";
import { errorResponse, successResponse } from "prime-qa-commons";

export const ResultController = {
  // 🟢 Create new Result (auto-link upward)
async create(req: Request, res: Response) {
    try {
      const { testId, status, executedBy, logs, startTime, endTime } = req.body;

      // 🧩 Step 1: Fetch the test and populate the run
      const test = await TestModel.findById(testId).populate("runId"); // ✅ populate runId

      if (!test) return res.json(errorResponse("Test not found"));

      // 🧩 Step 2: Derive projectId
      const projectId =
        test.projectId || (test.runId && (test.runId as any).projectId);

      if (!projectId) {
        return res.json(
          errorResponse("Project ID could not be resolved from test.")
        );
      }

      // 🧩 Step 3: Create result
      const result = await ResultModel.create({
        testId,
        projectId,
        status,
        executedBy,
        logs,
        startTime,
        endTime,
      });

      return res.json(successResponse(result, "Result recorded successfully"));
    } catch (err: any) {
      console.error("❌ Error creating result:", err);
      return res.json(errorResponse(err.message));
    }
  },


  // 🟢 Get all Results (optionally filter by testId)
  async getAll(req: Request, res: Response) {
    try {
      const { testId } = req.query;
      const filter = { isActive: true, ...(testId ? { testId } : {}) };
      const results = await ResultModel.find(filter).sort({ createdAt: -1 });
      return res.json(successResponse(results));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟢 Get single Result
  async getById(req: Request, res: Response) {
    try {
      const result = await ResultModel.findById(req.params.id);
      if (!result) return res.json(errorResponse("not found"));
      return res.json(successResponse(result));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  async getByProjectId(req: Request, res: Response) {
    try {
      const { projectId } = req.params;

      // Fetch all tests linked to the given projectId
      const data = await ResultModel.find({ projectId });

      // ✅ Return total count and data
      const total = data.length;
      if (!data || total === 0) {
        return res.json(errorResponse("No results found for this project"));
      }

      return res.json(
        successResponse({
          total,
          data,
        })
      );

    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟡 Update Result
  async update(req: Request, res: Response) {
    try {
      const result = await ResultModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!result) return res.json(errorResponse("not found"));
      return res.json(successResponse(result));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const result = await ResultModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!result) return res.json(errorResponse("not found"));
      return res.json(successResponse(result));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },
};
