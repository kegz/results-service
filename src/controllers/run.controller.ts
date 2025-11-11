import { Request, Response } from "express";
import { RunModel } from "../models/Run.model.js";
import { successResponse, errorResponse } from "prime-qa-commons";

export const RunController = {
  // 🟢 Create new Run
  async create(req: Request, res: Response) {
    try {
      const run = await RunModel.create(req.body);
      return res.json(successResponse(run));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟢 Get all Runs (optionally by project)
  async getAll(req: Request, res: Response) {
    try {
      const projectId = req.params.projectId;
      const filter = { isActive: true, ...(projectId ? { projectId } : {}) };
      const runs = await RunModel.find(filter).sort({ createdAt: -1 });
      return res.json(successResponse(runs));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🟢 Get single Run
  async getById(req: Request, res: Response) {
    try {
      const run = await RunModel.findById(req.params.id);
      if (!run) return res.json(errorResponse("Run not found"));
      return res.json(successResponse(run));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  async getByProjectId(req: Request, res: Response) {
    try {
      const { projectId } = req.params;

      // Fetch all tests linked to the given projectId
      const data = await RunModel.find({ projectId });

      // ✅ Return total count and data
      const total = data.length;
      if (!data || total === 0) {
        return res.json(errorResponse("No runs found for this project"));
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

  // 🟡 Update Run
  async update(req: Request, res: Response) {
    try {
      const run = await RunModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!run) res.json(errorResponse("Run not found"));
      return res.json(successResponse(run));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },

  // 🔴 Soft Delete
  async remove(req: Request, res: Response) {
    try {
      const run = await RunModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!run) return res.json(errorResponse("Run not found"));
      return res.json(successResponse(run));
    } catch (err: any) {
      return res.json(errorResponse(err.message));
    }
  },
};
