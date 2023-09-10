"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    // Parse query parameters
    const slackName = req.query.slack_name;
    const track = req.query.track;
    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];
    // Get the current UTC time formatted as specified
    const currentUTCTime = new Date().toISOString().split('.')[0] + 'Z';
    const response = {
        slack_name: slackName,
        current_day: currentDay,
        utc_time: currentUTCTime,
        track: track,
        github_file_url: 'https://github.com/edahmitchel/hng-stage-one/blob/main/dist/index.js',
        github_repo_url: 'https://github.com/edahmitchel/hng-stage-one',
        status_code: 200,
    };
    res.status(200).json(response);
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
