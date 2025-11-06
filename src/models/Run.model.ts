import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRun extends Document {
  projectId: Types.ObjectId;
  name: string;
  description?: string;
  type: "Manual" | "Automated" | "Scheduled";
  status: "Pending" | "Running" | "Completed" | "Aborted";
  environment?: string;
  executedBy?: Types.ObjectId;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  isActive: boolean;
}

const RunSchema = new Schema<IRun>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["Manual", "Automated", "Scheduled"], default: "Automated" },
    status: { type: String, enum: ["Pending", "Running", "Completed", "Aborted"], default: "Pending" },
    environment: { type: String },
    executedBy: { type: Schema.Types.ObjectId, ref: "User" },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

RunSchema.pre<IRun>("save", function (next) {
  if (this.startTime && this.endTime)
    this.duration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
  next();
});

export const RunModel = mongoose.model<IRun>("Run", RunSchema);
