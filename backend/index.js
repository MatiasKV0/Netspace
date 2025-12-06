import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './src/config/db.js';
import corsOptions from './src/config/corsConfig.js';

import MoviesRouter from './src/routes/moviesRouter.js';
import UserRouter from './src/routes/userRouter.js';

const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/', MoviesRouter);
app.use('/api/user', UserRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

