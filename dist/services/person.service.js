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
exports.PersonService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class PersonService {
    constructor(_personModel) {
        this._personModel = _personModel;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = this._personModel.build(dto);
            yield person.save();
            return person;
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._personModel.find(Object.assign({}, filter));
        });
    }
    findOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = this._processFilter(param);
            return yield this._personModel.findOne(filter);
        });
    }
    update(param, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = this._processFilter(param);
            return yield this._personModel.findOneAndUpdate(filter, fields, { new: true, runValidators: true });
        });
    }
    delete(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = this._processFilter(param);
            const person = yield this._personModel.findOneAndDelete(filter);
            return person;
        });
    }
    _processFilter(param) {
        if (mongoose_1.default.Types.ObjectId.isValid(param))
            return { _id: param };
        return { name: param };
    }
}
exports.PersonService = PersonService;
