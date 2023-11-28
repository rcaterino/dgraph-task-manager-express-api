"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksValidator = void 0;
const express_validator_1 = require("express-validator");
class TasksValidator {
    static createTaskValidations = [
        (0, express_validator_1.body)('label').notEmpty().withMessage('Label is required'),
        (0, express_validator_1.body)('scheduledAt')
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
    static updateTaskValidations = [
        (0, express_validator_1.body)('label').optional().notEmpty().isString().withMessage('Label cannot be empty'),
        (0, express_validator_1.body)('scheduledAt')
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
        (0, express_validator_1.body)('status')
            .optional()
            .isIn(['DONE', 'CANCELLED'])
            .withMessage(value => `Invalid status: ${value}. Status can only be updated to DONE or CANCELLED`)
            .isString()
            .withMessage('Status must be a string'),
        (0, express_validator_1.body)().custom((body) => {
            const allowedFields = ['label', 'scheduledAt', 'status'];
            const invalidFields = Object.keys(body).filter(field => !allowedFields.includes(field));
            if (invalidFields.length > 0) {
                throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
            }
            return true;
        }),
    ];
    static idValidator = [
        (0, express_validator_1.param)('id')
            .matches(/^0x[0-9a-f]+$/i).withMessage('Id must be a hexadecimal string starting with 0x'),
    ];
}
exports.TasksValidator = TasksValidator;
