import express, { type Request, type Response } from 'express';
import { connectDatabase, isDatabaseReady } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: isDatabaseReady() ? 'connected' : 'unavailable' });
});

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/', (_request, response) => {
  response.json({
    apiBaseUrl,
    routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

function registerResourceRoutes(path: string, model: typeof User, sort?: Record<string, 1 | -1>): void {
  app.get(`/api/${path}/`, async (_request: Request, response: Response) => {
    if (!isDatabaseReady()) {
      response.status(503).json({ error: 'Database unavailable' });
      return;
    }

    try {
      response.json(await model.find().sort(sort).lean());
    } catch (error) {
      console.error(`Failed to load ${path}:`, error);
      response.status(500).json({ error: `Unable to load ${path}` });
    }
  });

  app.post(`/api/${path}/`, async (request: Request, response: Response) => {
    if (!isDatabaseReady()) {
      response.status(503).json({ error: 'Database unavailable' });
      return;
    }

    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      console.error(`Failed to create ${path} record:`, error);
      response.status(400).json({ error: `Unable to create ${path} record` });
    }
  });
}

registerResourceRoutes('users', User);
registerResourceRoutes('teams', Team);
registerResourceRoutes('activities', Activity, { date: -1 });
registerResourceRoutes('leaderboard', LeaderboardEntry, { points: -1 });
registerResourceRoutes('workouts', Workout);

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  void connectDatabase();
});