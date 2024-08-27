"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const logger_1 = __importDefault(require("./config/logger"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger = require('./swagger/swagger.json');
class App {
    constructor() {
        this.logStream = logger_1.default.logStream;
        this.logger = logger_1.default.logger;
        this.errorHandler = new error_middleware_1.default();
        this.app = (0, express_1.default)();
        this.host = process.env.APP_HOST;
        this.port = process.env.APP_PORT;
        this.api_version = process.env.API_VERSION;
        this.initializeMiddleWares();
        this.initializeRoutes();
        this.initializeErrorHandlers();
        this.startApp();
    }
    initializeMiddleWares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('combined', { stream: this.logStream }));
    }
    initializeRoutes() {
        this.app.use(
        //`/api/${this.api_version}`,
        (0, routes_1.default)());
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger));
    }
    initializeErrorHandlers() {
        this.app.use(this.errorHandler.appErrorHandler);
        this.app.use(this.errorHandler.genericErrorHandler);
        this.app.use(this.errorHandler.notFound);
    }
    startApp() {
        this.app.listen(this.port, () => {
            this.logger.info(
            // `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
            `Server started at ${this.host}:${this.port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
const app = new App();
exports.default = app;
