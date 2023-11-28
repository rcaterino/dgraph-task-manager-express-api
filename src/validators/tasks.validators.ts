import { body, param } from 'express-validator';

export class TasksValidator {
  // Validation rules for creating a new task
  static createTaskValidations = [
    // Validation for non-empty label
    body('label').notEmpty().withMessage('Label is required'),

    // Validation for scheduledAt field to match ISO 8601 date-time string and be in the future
    body('scheduledAt')
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      .withMessage('ScheduledAt must be a valid ISO 8601 date-time string')
      .custom((value) => {
        const scheduledDate = new Date(value);
        const now = new Date();
        if (scheduledDate < now) {
          throw new Error('scheduledAt cannot be earlier than the current date');
        }
        return true;
      }),
  ];

  // Validation rules for updating an existing task
  static updateTaskValidations = [
    // Validation for optional non-empty label if provided
    body('label').optional().notEmpty().isString().withMessage('Label cannot be empty'),

    // Validation for optional scheduledAt field to match ISO 8601 date-time string and be in the future if provided
    body('scheduledAt')
      .optional()
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      .withMessage('ScheduledAt must be a valid ISO 8601 date-time string')
      .custom((value) => {
        const scheduledDate = new Date(value);
        const now = new Date();
        if (scheduledDate < now) {
          throw new Error('scheduledAt cannot be earlier than the current date');
        }
        return true;
      }),

    // Validation for optional status field to be either 'DONE' or 'CANCELLED' if provided
    body('status')
      .optional()
      .isIn(['DONE', 'CANCELLED'])
      .withMessage(value => `Invalid status: ${value}. Status can only be updated to DONE or CANCELLED`)
      .isString()
      .withMessage('Status must be a string'),

    // Custom validation to ensure only allowed fields are being updated
    body().custom((body) => {
      const allowedFields = ['label', 'scheduledAt', 'status'];
      const invalidFields = Object.keys(body).filter(field => !allowedFields.includes(field));
      if (invalidFields.length > 0) {
        throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
      }
      return true;
    }),
  ];

  // Validation rule for task ID
  static idValidator = [
    // Validation for ID to be a hexadecimal string starting with '0x'
    param('id')
      .matches(/^0x[0-9a-f]+$/i)
      .withMessage('Id must be a hexadecimal string starting with 0x'),
  ];
}
