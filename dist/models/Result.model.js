import mongoose, { Schema } from "mongoose";
const ResultSchema = new Schema({
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
}, { timestamps: true });
ResultSchema.pre("save", function (next) {
    if (this.startTime && this.endTime)
        this.duration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    next();
});
export const ResultModel = mongoose.model("Result", ResultSchema);
