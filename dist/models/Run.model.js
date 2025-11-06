import mongoose, { Schema } from "mongoose";
const RunSchema = new Schema({
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
}, { timestamps: true });
RunSchema.pre("save", function (next) {
    if (this.startTime && this.endTime)
        this.duration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    next();
});
export const RunModel = mongoose.model("Run", RunSchema);
