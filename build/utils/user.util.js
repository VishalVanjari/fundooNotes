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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const amqplib_1 = __importDefault(require("amqplib"));
var exchange = 'myexchange';
class Util {
    constructor() {
        this.forgetUser = (body) => __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign({ email: body }, config_1.default.development.secret2, {
                expiresIn: '1h'
            });
            return token;
        });
        this.forgetUseVerify = (token) => __awaiter(this, void 0, void 0, function* () {
            const { email } = yield jsonwebtoken_1.default.verify(token, config_1.default.development.secret2);
            return email;
        });
    }
    login(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign({ id, username }, config_1.default.development.secret, {
                expiresIn: '1h'
            });
            return token;
        });
    }
    verify(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield jsonwebtoken_1.default.verify(body, config_1.default.development.secret);
            return data;
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = JSON.stringify(message);
                const client = yield amqplib_1.default.connect('amqp://localhost');
                const channel = yield client.createChannel();
                yield channel.assertExchange(exchange, 'fanout', { durable: false });
                channel.publish(exchange, '', Buffer.from(data));
                console.log(`Sent: ${data}`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Util;
