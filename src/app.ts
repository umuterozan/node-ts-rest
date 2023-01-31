import express, { Application } from 'express';
import * as dotenv from 'dotenv';

import menuRoutes from './routes/menu.route';

const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App listening on ${PORT} port.`);
});
