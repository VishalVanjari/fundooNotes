"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserRoutes {
    constructor() {
        this.UserController = new user_controller_1.default();
        this.router = express_1.default.Router();
        this.UserValidator = new user_validator_1.default();
        this.routes = () => {
            // register the new user
            this.router.post('/register', this.UserValidator.newUser, this.UserController.registerUser);
            // Login user
            this.router.post('/login', this.UserValidator.login, this.UserController.loginUser);
            //route to Get a user by their id
            this.router.get('/getuser', auth_middleware_1.userAuth, this.UserController.getUser);
            //route to update a user
            this.router.put('/updateuser', auth_middleware_1.userAuth, this.UserController.updateUser);
            //route to delete a user by their id
            this.router.delete('/deleteuser', auth_middleware_1.userAuth, this.UserController.deleteUser);
            //route to Get all user
            this.router.get('/', this.UserController.getAllUsers);
            // route to Change password
            this.router.post('/change', auth_middleware_1.userAuth, this.UserController.change);
            // route to forget password
            this.router.post('/forget', this.UserController.forget);
            // route to reset password
            this.router.post('/reset', auth_middleware_1.forgetUserAuth, this.UserController.reset);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = UserRoutes;
