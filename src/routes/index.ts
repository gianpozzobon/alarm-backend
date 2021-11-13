import path from 'path';

import { Express } from 'express';

import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';

export const routes = (app: Express): void => {
  const options: RoutingControllersOptions = {
    defaultErrorHandler: false,
    validation: true,
    routePrefix: '/api',
    cors: true,
    development: true,
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204,
      paramOptions: {
        required: true,
      },
    },

    controllers: [path.join(__dirname, '..', '/modules/**/controllers/*{.ts,.js}')],
    middlewares: [path.join(__dirname, '..', '/modules/**/middlewares/*{.ts,.js}')],
    interceptors: [path.join(__dirname, '..', '/modules/**/interceptors/*{.ts,.js}')],
  };

  useExpressServer(app, options);
};
