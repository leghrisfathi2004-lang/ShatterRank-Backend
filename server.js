import exxpress from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

//put here the connectDB

//here goes the routes:
//ex: app.use('/api/matches', require('./routes/matchRoutes'));