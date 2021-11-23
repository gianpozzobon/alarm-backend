import 'reflect-metadata';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

import { routes } from './routes';

import './database';

const app = express();

const server = createServer(app);

app.use(express.json());

routes(app);

export { server };
