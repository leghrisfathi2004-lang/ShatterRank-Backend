import express from 'express';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import teamRoute from './routes/team.route.js';
import playerRoute from './routes/player.route.js';
import matchRoute from './routes/match.route.js';
import tournoiRoute from './routes/tournoi.route.js';
import giftcardRoute from './routes/giftcard.route.js';
import errorHandler from './middleware/errorhandler.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/teams', teamRoute);
app.use('/api/players', playerRoute);
app.use('/api/matchs', matchRoute);
app.use('/api/tournois', tournoiRoute);
app.use('/api/giftcards', giftcardRoute);

app.use(errorHandler);

export default app;
