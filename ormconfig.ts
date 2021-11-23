const isDevelopment = process.env.NODE_ENV === 'development';

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  migrations: [`./${isDevelopment ? 'src' : 'dist'}/database/migrations/*{.ts,.js}`],
  cli: { migrationsDir: `./${isDevelopment ? 'src' : 'dist'}/database/migrations` },
  entities: [`./${isDevelopment ? 'src' : 'dist'}/database/entities/**/*{.ts,.js}`],
  logging: process.env.DB_LOGGING_LEVEL ? process.env.DB_LOGGING_LEVEL.split(',') : undefined,
};

if (process.env.DB_SSL === 'true') {
  connection.ssl = { rejectUnauthorized: false };
}

export default {
  type: 'postgres',
  ...connection,
};
