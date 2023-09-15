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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const not_found_error_1 = require("./errors/not-found.error");
class App {
    constructor(controllers, PORT = 5000, URL = `http://localhost:${PORT}`) {
        this._app = (0, express_1.default)();
        this.PORT = PORT;
        this.URL = URL;
        this._initializeMiddleware();
        this._initializeControllers(controllers);
        this._initializeErrorMiddleware();
    }
    listen() {
        this._app.listen(this.PORT, () => {
            console.log(`App is running on ${this.URL}`);
        });
    }
    _initializeMiddleware() {
        this._app.use(express_1.default.json());
        this._app.use((0, cors_1.default)());
    }
    _initializeErrorMiddleware() {
        this._app.use(errorHandler_middleware_1.errHandler);
    }
    _initializeControllers(controllers) {
        for (let controller of controllers) {
            this._app.use('/', controller.router);
        }
        this._app.all('*', (req, res) => __awaiter(this, void 0, void 0, function* () {
            throw new not_found_error_1.NotFoundError();
        }));
    }
}
exports.default = App;
