import express, { Application } from 'express';
import * as dotenv from 'dotenv';

import menuRoutes from './routes/menu.route';
import contentRoutes from './routes/content.route';
import authRoutes from './routes/auth.route';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/menu', menuRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App listening on ${PORT} port.`);
});
