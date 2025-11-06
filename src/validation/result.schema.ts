import Joi from "joi";

export const createResultSchema = Joi.object({
  testId: Joi.string().required().messages({
    "any.required": "Test ID is required",
    "string.empty": "Test ID cannot be empty",
  }),
  status: Joi.string()
    .valid("Passed", "Failed", "Blocked", "Skipped", "Retest")
    .default("Skipped"),
  executedBy: Joi.string().allow("", null),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  logs: Joi.string().allow("", null),
});

export const updateResultSchema = Joi.object({
  status: Joi.string().valid("Passed", "Failed", "Blocked", "Skipped", "Retest"),
  executedBy: Joi.string().allow("", null),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  logs: Joi.string().allow("", null),
  isActive: Joi.boolean(),
});
