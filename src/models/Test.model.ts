import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITest extends Document {
  runId: Types.ObjectId;
  projectId: Types.ObjectId;
  testCaseId: Types.ObjectId;
  suiteId: Types.ObjectId;
  sectionId: Types.ObjectId;
  title: string;
  isActive: boolean;
}

const TestSchema = new Schema<ITest>(
  {
    runId: { type: Schema.Types.ObjectId, ref: "Run", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    testCaseId: { type: Schema.Types.ObjectId, ref: "TestCase", required: true },
    suiteId: { type: Schema.Types.ObjectId, ref: "Suite" },
    sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
    title: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const TestModel = mongoose.model<ITest>("Test", TestSchema);
