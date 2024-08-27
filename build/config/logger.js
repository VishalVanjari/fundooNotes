"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
require("winston-daily-rotate-file");
class Logger {
}
/**
 * Logger handles all logs in the application
 */
Logger.logger = winston_1.default.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.simple()),
    transports: [
        new winston_1.default.transports.File({
            filename: 'logs/server/error.log',
            level: 'error',
            handleExceptions: true
        }),
        new winston_1.default.transports.File({
            filename: 'logs/server/all.log',
            level: 'info',
            handleExceptions: true
        }),
        new winston_1.default.transports.DailyRotateFile({
            maxFiles: '14d',
            level: 'info',
            dirname: 'logs/server/daily',
            datePattern: 'YYYY-MM-DD',
            filename: '%DATE%.log'
        }),
        new winston_1.default.transports.Console({
            level: 'debug',
            handleExceptions: true
        })
    ]
});
Logger.logStream = {
    /**
     * A writable stream for winston logger.
     *
     * @param {any} message
     */
    write(message) {
        /**
         * morganLogger logs all http request in a dedicated file and on console
         */
        const morganLogger = winston_1.default.createLogger({
            format: winston_1.format.combine(winston_1.format.simple()),
            transports: [
                new winston_1.default.transports.File({
                    filename: 'logs/requests/all.log',
                    level: 'debug',
                    handleExceptions: true
                }),
                new winston_1.default.transports.Console({
                    level: 'debug',
                    handleExceptions: true
                }),
                new winston_1.default.transports.DailyRotateFile({
                    maxFiles: '14d',
                    level: 'info',
                    dirname: 'logs/requests/daily',
                    datePattern: 'YYYY-MM-DD',
                    filename: '%DATE%.log'
                })
            ]
        });
        morganLogger.info(message.toString());
    }
};
exports.default = Logger;
