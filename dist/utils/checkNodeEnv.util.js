"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDevMode() {
    return process.env.NODE_ENV === 'development';
}
exports.default = isDevMode;
