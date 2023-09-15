"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Task1Controller {
    constructor() {
        this.path = '/api';
        this.router = express_1.default.Router();
        this.task1 = (req, res) => {
            const query = req.query;
            const currentDate = new Date();
            const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const task1 = {
                slack_name: query.slack_name,
                current_day: WEEKDAYS[currentDate.getDay()],
                utc_time: currentDate.toISOString().split('.')[0] + 'Z',
                track: query.track,
                github_file_url: process.env.GITHUB_FILE_URL,
                github_repo_url: process.env.GITHUB_REPO_URL,
                status_code: 200,
            };
            res.json(task1);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/task1`, this.task1);
    }
}
exports.default = Task1Controller;
