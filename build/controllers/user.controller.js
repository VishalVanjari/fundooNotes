"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.UserService = new user_service_1.default();
        //Register the new User
        this.registerUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.registerUser(req.body);
                res.status(http_status_codes_1.default.CREATED).json({
                    code: http_status_codes_1.default.CREATED,
                    data: data,
                    message: 'User register successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        //Login User
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.loginUser(req.body.email, req.body.password);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data.data,
                    message: data.message,
                    token: data.token
                });
            }
            catch (error) {
                next(error);
            }
        });
        // get a user
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.getUser(req.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'User fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Get All Users
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.getAllUsers();
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'All users fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Update USer
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.updateUser(req.id, req.body);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'User updated successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Delete USer
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.UserService.deleteUser(req.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: {},
                    message: 'User deleted successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Change Password of USer
        this.change = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.change(req.id, req.body);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'Password changed successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        //forget Password
        this.forget = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.forget(req.body.email);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data.data,
                    token: data.token,
                    message: 'Token Verify successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // reset password
        this.reset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserService.reset(req.email, req.body);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'Password updated successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
