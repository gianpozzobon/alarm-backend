import { SERVER_PORT } from '@config/env';

import { started } from '@shared/utils';

import { server } from './app';

import './mqtt';

server.listen(SERVER_PORT, started);
