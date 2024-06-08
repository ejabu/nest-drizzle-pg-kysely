import DatabaseConfig from './database.config';

const AppConfig = () => ({
  environment: process.env.NODE_ENVIRONMENT
    ? process.env.NODE_ENVIRONMENT
    : 'development',
  sequelize: {
    ...DatabaseConfig(),
  },
});

export default AppConfig;
