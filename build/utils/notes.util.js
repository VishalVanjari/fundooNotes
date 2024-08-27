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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const redis_1 = __importDefault(require("../config/redis"));
class Note {
    constructor() {
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.id;
            try {
                const data = yield redis_1.default.hGetAll(`GetAll${id}`);
                if (data && Object.keys(data).length > 0) {
                    const parsedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, JSON.parse(value)]));
                    console.log('Data returned from Redis');
                    res.status(http_status_codes_1.default.OK).json({
                        code: http_status_codes_1.default.OK,
                        data: parsedData,
                        message: 'Note Retrieved Successfully from Redis'
                    });
                }
                else {
                    next();
                }
            }
            catch (err) {
                console.error('Redis error:', err);
                res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                    code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error'
                });
            }
        });
        this.set = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                for (const note of data) {
                    const key = (note.dataValues.id).toString();
                    const value = JSON.stringify(note.dataValues);
                    yield redis_1.default.hSet(`GetAll${id}`, key, value);
                    console.log('Note saved:', key);
                }
                return true;
            }
            catch (err) {
                console.error('Redis error:', err);
                throw new Error('Failed to set data in Redis');
            }
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const key = (data.dataValues.id).toString();
                const value = JSON.stringify(data.dataValues);
                const result = yield redis_1.default.hSet(`GetAll${id}`, key, value);
            }
            catch (err) {
                console.error('Redis error:', err);
                throw new Error('Failed to set data in Redis');
            }
        });
        this.connection();
    }
    connection() {
        redis_1.default.on('connect', () => {
            console.log('Redis connection: successful');
        });
        redis_1.default.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }
}
exports.default = Note;
