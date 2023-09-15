"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const personSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true }
}, {
    toJSON: {
        getters: true,
        transform(doc, ret, options) {
            delete ret._id;
            delete ret.__v;
        },
    },
    toObject: { getters: true }
});
personSchema.statics.build = (attrs) => {
    return new Person(attrs);
};
const Person = mongoose_1.default.model('Person', personSchema);
exports.default = Person;
