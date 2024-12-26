import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';
import authenticate from './authenticate';
import creditRouter from './api/credits';
import favouriteRouter from './api/favourite';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/credit', authenticate, creditRouter);
app.use('/api/favourite', authenticate, favouriteRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
