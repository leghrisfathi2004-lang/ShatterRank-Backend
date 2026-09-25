import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './utils/db.js';
import seedAdmin from './utils/seedAdmin.js';
import authRoute from './routes/auth.route.js';
import teamRoute from './routes/team.route.js';
import playerRoute from './routes/player.route.js';
import matchRoute from './routes/match.route.js';
import tournoiRoute from './routes/tournoi.route.js';
import giftcardRoute from './routes/giftcard.route.js';
import errorHandler from './middleware/errorhandler.js';

dotenv.config();

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', teamRoute);
app.use('/api', playerRoute);
app.use('/api', matchRoute);
app.use('/api', tournoiRoute);
app.use('/api', giftcardRoute);

app.use(errorHandler);

const PORT = 3000;

(async () => {
    await connectDB();
    await seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();