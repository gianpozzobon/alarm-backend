import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const { NODE_ENV, SERVER_URL } = process.env;

const NODE_VERSION = process.versions.node;

const SERVER_PORT = Number(process.env.SERVER_PORT || process.env.PORT);

export { NODE_ENV, NODE_VERSION, SERVER_URL, SERVER_PORT };
