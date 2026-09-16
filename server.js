import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './utils/db.js';
import authRoute from './routes/auth.route.js';
import teamRoute from './routes/team.route.js';
import playerRoute from './routes/player.route.js';
import matchRoute from './routes/match.route.js';
import tournoiRoute from './routes/tournoi.route.js';
import giftcardRoute from './routes/giftcard.route.js';
import errorHandler from './middleware/errorhandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoute);
app.use('/api', teamRoute);
app.use('/api', playerRoute);
app.use('/api', matchRoute);
app.use('/api', tournoiRoute);
app.use('/api', giftcardRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));