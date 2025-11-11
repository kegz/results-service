import mongoose, { Schema, Document, Types } from "mongoose";

export interface IResult extends Document {
  testId: Types.ObjectId;
  projectId: Types.ObjectId;
  status: "Passed" | "Failed" | "Blocked" | "Skipped" | "Retest";
  executedBy?: Types.ObjectId;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  logs?: string;
  isActive: boolean;
}

const ResultSchema = new Schema<IResult>(
  {
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: {
      type: String,
      enum: ["Passed", "Failed", "Blocked", "Skipped", "Retest"],
      default: "Skipped"
    },
    executedBy: { type: Schema.Types.ObjectId, ref: "User" },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number },
    logs: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ResultSchema.pre<IResult>("save", function (next) {
  if (this.startTime && this.endTime)
    this.duration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
  next();
});

export const ResultModel = mongoose.model<IResult>("Result", ResultSchema);
