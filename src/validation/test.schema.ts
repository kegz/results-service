import Joi from "joi";

export const createTestSchema = Joi.object({
  runId: Joi.string().required().messages({
    "any.required": "Run ID is required",
    "string.empty": "Run ID cannot be empty",
  }),
  testCaseId: Joi.string().required().messages({
    "any.required": "Test Case ID is required",
    "string.empty": "Test Case ID cannot be empty",
  }),
  suiteId: Joi.string().optional(),
  sectionId: Joi.string().optional(),
  title: Joi.string().min(2).required().messages({
    "any.required": "Test title is required",
    "string.min": "Test title must be at least 2 characters",
  }),
  status: Joi.string().valid("Not Started", "In Progress", "Completed").default("Not Started"),
});

export const updateTestSchema = Joi.object({
  title: Joi.string().min(2),
  status: Joi.string().valid("Not Started", "In Progress", "Completed"),
  isActive: Joi.boolean(),
});
