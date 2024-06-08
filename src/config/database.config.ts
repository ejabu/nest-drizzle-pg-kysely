import * as models from 'src/database/models/index';

const DatabaseConfig = () => ({
  dialect: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [
  ],
  logging: false,
  repositoryMode: true,
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
});

export default DatabaseConfig;
