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
exports.PersonController = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_middleware_1 = require("../middleware/validate-request.middleware");
const not_found_error_1 = require("../errors/not-found.error");
class PersonController {
    constructor(_personService) {
        this._personService = _personService;
        this.router = express_1.default.Router();
        this.path = '/api';
        this._createPerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const person = yield this._personService.create({ name });
            res.status(201).json(person);
        });
        this._findPersons = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const persons = yield this._personService.findMany();
            res.json(persons);
        });
        this._findPerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const person = yield this._personService.findOne(id);
            res.json(person);
        });
        this._updatePerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            const person = yield this._personService.update(id, { name });
            res.json(person);
        });
        this._deletePerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const person = yield this._personService.delete(id);
            if (!person) {
                throw new not_found_error_1.NotFoundError();
            }
            res.status(200).json(person);
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, [
            (0, express_validator_1.body)('name')
                .not().isEmpty()
                .trim()
                .isString()
                .withMessage('Name is required')
        ], validate_request_middleware_1.validateRequest, this._createPerson);
        this.router.get(this.path, this._findPersons);
        this.router.get(`${this.path}/:id`, this._findPerson);
        this.router.put(`${this.path}/:id`, [
            (0, express_validator_1.body)('name')
                .not().isEmpty()
                .trim()
                .isString()
                .withMessage('Name is required')
        ], validate_request_middleware_1.validateRequest, this._updatePerson);
        this.router.delete(`${this.path}/:id`, this._deletePerson);
    }
}
exports.PersonController = PersonController;
