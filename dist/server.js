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
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
const validateENV_util_1 = __importDefault(require("./utils/validateENV.util"));
const person_controller_1 = require("./controllers/person.controller");
const person_service_1 = require("./services/person.service");
const person_model_1 = __importDefault(require("./models/person.model"));
const database_util_1 = __importDefault(require("./utils/database.util"));
const database_connection_error_1 = require("./errors/database-connection.error");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // ensure required env variables are present
    (0, validateENV_util_1.default)();
    // Other variables declaration
    const URL = process.env.URL || 'http://localhost:5000';
    const PORT = process.env.PORT || 5000;
    try {
        yield new database_util_1.default(process.env.DB_URI).connect();
    }
    catch (error) {
        throw new database_connection_error_1.DatabaseConnectionError();
    }
    const app = new app_1.default([
        new person_controller_1.PersonController(new person_service_1.PersonService(person_model_1.default)),
    ], PORT, URL);
    app.listen();
}))();
