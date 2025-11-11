import { TestModel } from "../models/Test.model.js";
import { RunModel } from "../models/Run.model.js";
import { errorResponse, successResponse } from "prime-qa-commons";
export const TestController = {
    // 🟢 Create a new Test (auto-link projectId from Run)
    async create(req, res) {
        try {
            // ✅ Handle both array and single object
            const isArray = Array.isArray(req.body);
            // 🔍 Determine the runId properly
            const runId = isArray ? req.body[0]?.runId : req.body.runId;
            if (!runId)
                return res.json(errorResponse("Missing runId"));
            // ✅ Validate that run exists
            const run = await RunModel.findById(runId);
            if (!run)
                return res.json(errorResponse("Run not found"));
            if (isArray) {
                // 🟩 Handle array of test creation requests
                const createdTests = await Promise.all(req.body.map(async (item) => {
                    const { testCaseId, title, suiteId, sectionId, projectId } = item;
                    // use projectId from run if not provided
                    return TestModel.create({
                        runId,
                        projectId: projectId || run.projectId,
                        testCaseId,
                        suiteId,
                        sectionId,
                        title,
                        isActive: item.isActive ?? true,
                    });
                }));
                return res.json(successResponse(createdTests));
            }
            else {
                // 🟦 Handle single test creation
                const { testCaseId, title, suiteId, sectionId, projectId } = req.body;
                const test = await TestModel.create({
                    runId,
                    projectId: projectId || run.projectId,
                    testCaseId,
                    suiteId,
                    sectionId,
                    title,
                    isActive: req.body.isActive ?? true,
                });
                return res.json(successResponse(test));
            }
        }
        catch (err) {
            console.error("❌ Create test(s) failed:", err);
            return res.json(errorResponse(err.message));
        }
    },
    // 🟢 Get all Tests (optionally filter by runId)
    async getAll(req, res) {
        try {
            const { runId } = req.query;
            const filter = { isActive: true, ...(runId ? { runId } : {}) };
            const tests = await TestModel.find(filter).sort({ createdAt: -1 });
            return res.json(successResponse(tests));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🟢 Get single Test
    async getById(req, res) {
        try {
            const test = await TestModel.findById(req.params.id);
            if (!test)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(test));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🟢 Get all Tests by Project ID
    async getByProjectId(req, res) {
        try {
            const { projectId } = req.params;
            // Fetch all tests linked to the given projectId
            const tests = await TestModel.find({ projectId });
            // ✅ Return total count and data
            const total = tests.length;
            if (!tests || total === 0) {
                return res.json(errorResponse("No tests found for this project"));
            }
            return res.json(successResponse({
                total,
                tests,
            }));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🟡 Update Test
    async update(req, res) {
        try {
            const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!test)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(test));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
    // 🔴 Soft Delete
    async remove(req, res) {
        try {
            const test = await TestModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!test)
                return res.json(errorResponse("not found"));
            return res.json(successResponse(test));
        }
        catch (err) {
            return res.json(errorResponse(err.message));
        }
    },
};
