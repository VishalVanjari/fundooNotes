"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = __importDefault(require("../config/logger"));
class ErrorMiddleware {
    constructor() {
        this.notFound = (req, res) => {
            res.status(http_status_codes_1.default.NOT_FOUND).json({
                code: http_status_codes_1.default.NOT_FOUND,
                message: 'Ooops, route not found'
            });
        };
        // eslint-disable-next-line no-unused-vars
        this.appErrorHandler = (err, req, res, next) => {
            if (err.code && typeof err.code === 'number') {
                this.logger.error(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);
                res.status(err.code).json({
                    code: err.code,
                    message: err.message
                });
            }
            else {
                next(err);
            }
        };
        // eslint-disable-next-line no-unused-vars
        this.genericErrorHandler = (err, req, res, next) => {
            this.logger.error(`
    status - ${http_status_codes_1.default.INTERNAL_SERVER_ERROR} 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                data: '',
                message: err.message
            });
        };
        this.logger = logger_1.default.logger;
    }
}
exports.default = ErrorMiddleware;
