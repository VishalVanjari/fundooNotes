import { Sequelize } from 'sequelize';
import Logger from './logger';
import dotenv from 'dotenv';
dotenv.config();
export { DataTypes } from 'sequelize';

const logger = Logger.logger;

const DATABASE = process.env.DATABASE;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT = parseInt(process.env.PORT);

if (process.env.NODE_ENV === 'test') {
  const DATABASE = process.env.DATABASE;
  const USERNAME = process.env.DB_USERNAME;
  const PASSWORD = process.env.PASSWORD;
  const HOST = process.env.HOST;
  const PORT = parseInt(process.env.PORT);
}

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the database.');
  })
  .catch((error) => {
    logger.error('Could not connect to the database.', error);
  });

sequelize.sync();

export default sequelize;
