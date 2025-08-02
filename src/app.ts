import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import glucoseRoutes from './routes/glucoseRoutes';
import lifestyleRoutes from './routes/lifestyleRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.send('Glucose Monitor API running'));
app.use('/api/glucose', glucoseRoutes);
app.use('/api/lifestyle', lifestyleRoutes);

export default app;
