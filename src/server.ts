import 'reflect-metadata';
import express from 'express';

import { SERVER_PORT } from '@config/env';
import { started } from '@shared/utils';

import { routes } from './routes';

import './database';

const server = express();

server.use(express.json());

routes(server);

server.listen(SERVER_PORT, started);
