import * as models from 'src/database/models/index';

const DatabaseConfig = () => {
  const options = {
    dialect: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [models.Issue],
    logging: false,
    repositoryMode: true,
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
  };
  return options;
};

export default DatabaseConfig;
