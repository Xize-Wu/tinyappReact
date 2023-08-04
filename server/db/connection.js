import { Sequelize } from 'sequelize';

const {PG_PORT, PG_NAME, PG_USER, PASSWORD, HOST} = process.env;
const connStr = `postgres://${PG_USER}:${PASSWORD}@${HOST}:${PG_PORT}/${PG_NAME}`;
const sequelize = new Sequelize(connStr);

try {
  await sequelize.authenticate();
  console.log('Fuiyoh! Connection has been established successfully.');
} catch (error) {
  console.error('Haiyaa... Unable to connect to the database:', error);
}


export default sequelize;