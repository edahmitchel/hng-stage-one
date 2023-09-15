"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        // GITHUB_FILE_URL: str(),
        // GITHUB_REPO_URL: str(),
        DB_URI: (0, envalid_1.str)(),
    });
}
exports.default = validateEnv;
