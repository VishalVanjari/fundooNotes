"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class NoteValidator {
    constructor() {
        this.updateNote = (req, res, next) => {
            const schema = joi_1.default.object({
                title: joi_1.default.string().optional(),
                description: joi_1.default.string().optional(),
                color: joi_1.default.string().optional(),
                archive: joi_1.default.boolean().optional(),
                trash: joi_1.default.boolean().optional(),
                createdBy: joi_1.default.number().optional()
            });
            const header_schema = joi_1.default.object({
                authorization: joi_1.default.string().required()
            }).unknown(true);
            const { error: bodyError } = schema.validate(req.body);
            if (bodyError) {
                return res.status(400).json({ error: bodyError.details[0].message });
            }
            const { error: headersError } = header_schema.validate(req.headers);
            if (headersError) {
                return res.status(400).json({ error: headersError.details[0].message });
            }
            next();
        };
    }
}
exports.default = NoteValidator;
