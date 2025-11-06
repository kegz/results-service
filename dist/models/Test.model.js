import mongoose, { Schema } from "mongoose";
const TestSchema = new Schema({
    runId: { type: Schema.Types.ObjectId, ref: "Run", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    testCaseId: { type: Schema.Types.ObjectId, ref: "TestCase", required: true },
    suiteId: { type: Schema.Types.ObjectId, ref: "Suite" },
    sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
    title: { type: String, required: true },
    status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
export const TestModel = mongoose.model("Test", TestSchema);
