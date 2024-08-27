"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_route_1 = __importDefault(require("./user.route"));
const notes_route_1 = __importDefault(require("./notes.route"));
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
    router.get('/', (req, res) => {
        res.json('Welcome to fundoo Notes App');
    });
    router.use('/users', new user_route_1.default().getRoutes());
    router.use('/notes', new notes_route_1.default().getRoutes());
    return router;
};
exports.default = routes;
