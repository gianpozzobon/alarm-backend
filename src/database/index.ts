import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import config from 'ormconfig';

useContainer(Container);

createConnection(config)
  .then((connection) => {
    console.log(`Conectado: ${connection.isConnected}`);
  })
  .catch((err) => {
    console.log(err);
  });
