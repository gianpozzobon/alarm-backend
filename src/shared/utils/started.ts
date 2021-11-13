import { NODE_ENV, NODE_VERSION, SERVER_URL, SERVER_PORT } from '@config/env';

const started = (): void => {
  console.log(``);
  console.log(`Environment:\x1b[32m ${NODE_ENV} \x1b[0m`);
  console.log(`Node_Version:\x1b[32m ${NODE_VERSION} \x1b[0m`);
  console.log(`Running on: \x1b[32m ${SERVER_URL}:${SERVER_PORT}/api\x1b[0m`);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Database
      ╠═ host: ${process.env.DB_COMPOSE_HOST || process.env.DB_HOST}
      ╠═ port: ${process.env.DB_PORT}
      ╚═ data: ${process.env.DB_NAME}`);
  }

  console.log(``);
};

export { started };
