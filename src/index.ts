import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.get('/api', (req: Request, res: Response) => {
  // Parse query parameters
  const slackName = req.query.slack_name as string;
  const track = req.query.track as string;

  // Get the current day of the weeks
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time
  const currentUTCTime = new Date().toISOString();


  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: currentUTCTime,
    track: track,
    github_file_url: 'https://github.com/username/repo/dist/index.jst',
    github_repo_url: 'https://github.com/username/repo',
    status_code: 200,
  };


  res.status(200).json(response);
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
