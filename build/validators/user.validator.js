"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class UserValidator {
    constructor() {
        this.newUser = (req, res, next) => {
            const schema = joi_1.default.object({
                firstName: joi_1.default.string().min(3).required(),
                lastName: joi_1.default.string().min(3).required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(5).required(),
                mobile: joi_1.default.number().min(10).required(),
                gender: joi_1.default.string(),
                dob: joi_1.default.date()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                next(error);
            }
            next();
        };
        this.login = (req, res, next) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().required()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                next(error);
            }
            next();
        };
        // public update = (req: Request, res: Response, next: NextFunction): void => {
        //   const schema = Joi.object({
        //     firstName: Joi.string().min(3),
        //     lastName: Joi.string().min(3),
        //     email: Joi.string().email(),
        //     password: Joi.string().min(8),
        //     mobile: Joi.number().min(10),
        //     gender: Joi.string(),
        //     dob:public Joi.date(),
        //   });
        //   const { error } = schema.validate(req.body);
        //   if (error) {
        //     next(error);
        //   }
        //   next();
        // };
    }
}
exports.default = UserValidator;
