import Joi from "joi";
export const createRunSchema = Joi.object({
    projectId: Joi.string().required().messages({
        "any.required": "Project ID is required",
        "string.empty": "Project ID cannot be empty",
    }),
    name: Joi.string().min(2).required().messages({
        "any.required": "Run name is required",
        "string.min": "Run name must be at least 2 characters",
    }),
    description: Joi.string().allow("", null),
    type: Joi.string().valid("Manual", "Automated", "Scheduled").default("Automated"),
    status: Joi.string().valid("Pending", "Running", "Completed", "Aborted").default("Pending"),
    environment: Joi.string().allow("", null),
    executedBy: Joi.string().allow("", null),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
});
export const updateRunSchema = Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().allow("", null),
    type: Joi.string().valid("Manual", "Automated", "Scheduled"),
    status: Joi.string().valid("Pending", "Running", "Completed", "Aborted"),
    environment: Joi.string().allow("", null),
    executedBy: Joi.string().allow("", null),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
    isActive: Joi.boolean(),
});
