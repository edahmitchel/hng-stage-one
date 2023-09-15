"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const mongoose_1 = require("mongoose");
const logger_util_1 = require("../utils/logger.util");
const checkNodeEnv_util_1 = __importDefault(require("../utils/checkNodeEnv.util"));
const custom_error_1 = require("../errors/custom.error");
const errHandler = (err, req, res, next) => {
    var _a;
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    if (err instanceof mongoose_1.Error.ValidationError) {
        return res.status(400).json({ errors: [{ message: (_a = err.message.split(':').at(-1)) !== null && _a !== void 0 ? _a : 'invalid format' }] });
    }
    if (err.code === 11000) {
        return res.status(409).json({ errors: [{ message: 'Duplicate error', field: 'name' }] });
    }
    // Not expected error
    // Save to log file and/or Log to console in dev mode
    (0, checkNodeEnv_util_1.default)() && console.log(err);
    const errMsg = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
    (0, logger_util_1.logEvent)(errMsg, 'errLog.log');
    res.status(500).json({
        errors: [{ message: 'Something went wrong' }]
    });
};
exports.errHandler = errHandler;
