import { ResultModel } from "../models/Result.model.js";
import { TestModel } from "../models/Test.model.js";
import { errorResponse, successResponse } from "prime-qa-commons";
export const ResultController = {
    // 🟢 Create new Result (auto-link upward)
    async create(req, res) {
        try {
            const { testId, status, executedBy, logs, startTime, endTime } = req.body;
            const test = await TestModel.findById(testId);
            if (!test)
                return res.json(errorResponse("not found"));
            const result = await ResultModel.create({
                testId,
                status,
                executedBy,
                logs,
                startTime,
                endTime,
            });
            return successResponse(result, "Result recorded successfully");
        }
        catch (err) {
            console.error("❌ Error creating result:", err);
            return res.json(errorResponse(err.message));
        }
    },
    // 🟢 Get all Results (optionally filter by testId)
    async getAll(req, res) {
        try {
            const { testId } = req.query;
            const filter = { isActive: true, ...(testId ? { testId } : {}) };
            const results = await ResultModel.find(filter).sort({ createdAt: -1 });
            return res.json(successResponse(results));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🟢 Get single Result
    async getById(req, res) {
        try {
            const result = await ResultModel.findById(req.params.id);
            if (!result)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(result));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🟡 Update Result
    async update(req, res) {
        try {
            const result = await ResultModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!result)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(result));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    async remove(req, res) {
        try {
            const result = await ResultModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!result)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(result));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
};
