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
const database_1 = __importStar(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const user_util_1 = __importDefault(require("../utils/user.util"));
const secretKey = process.env.SECRET_KEY;
const saltRound = 10;
class UserService {
    constructor() {
        this.User = (0, user_1.default)(database_1.default, database_1.DataTypes);
        this.util = new user_util_1.default();
        //Register a new user
        this.registerUser = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const hashedPassword = await bcrypt.hash(body.password, saltRound);
                // body.password = hashedPassword;
                const data = yield this.User.create(body);
                const message = yield this.util.sendMessage(data);
                return data;
            }
            catch (error) {
                throw new Error('Error registering user: ' + error.message);
            }
        });
        //Login User
        this.loginUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.User.findOne({ where: { email: email } });
                const obj = {
                    data: data,
                    token: '',
                    message: 'Invalid User'
                };
                if (data && (yield bcrypt_1.default.compare(password, data.password))) {
                    obj.message = 'Loged In successfully';
                }
                else {
                    obj.data = null;
                    return obj;
                }
                const token = yield this.util.login(data.id, data.firstName);
                obj.token = token;
                return obj;
            }
            catch (error) {
                throw new error('Error Logging user: ');
            }
        });
        //get a single user
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.User.findByPk(id);
            return data;
        });
        //get all users
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.User.findAll();
            return data;
        });
        //update a user
        this.updateUser = (id, body) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(body.password, saltRound);
            body.password = hashedPassword;
            yield this.User.update(body, {
                where: { id: id }
            });
            return body;
        });
        //change password
        this.change = (id, body) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(body.password, saltRound);
            body.password = hashedPassword;
            yield this.User.update(body, {
                where: { id: id }
            });
            return body;
        });
        //delete a user
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.User.destroy({ where: { id: id } });
            return '';
        });
        //forget User
        this.forget = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.User.findOne({ where: { email: email } });
                const obj = {
                    data: data,
                    token: '',
                    message: 'Invalid User'
                };
                let token = '';
                if (data) {
                    token = yield this.util.forgetUser(email);
                }
                obj.token = token;
                return obj;
            }
            catch (error) {
                throw new error('Error Logging user: ');
            }
        });
        //Reset a Password
        this.reset = (email, body) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(body.password, saltRound);
            body.password = hashedPassword;
            yield this.User.update({ password: body.password }, {
                where: { email: email }
            });
            return body;
        });
    }
}
exports.default = UserService;
