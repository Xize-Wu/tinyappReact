import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import initUrlsModel from './urls.js'; // Import the model directly, not the CommonJS function
import initUsersModel from './users.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = await import(`${__dirname}/../config/config.json`, { assert: { type: 'json' } });

const db = {};

const sequelize = new Sequelize('postgres://labber:labber@localhost:5432/tinyapp');

const models = [
  initUsersModel(sequelize),
  initUrlsModel(sequelize) // Call the function to get the model definition
];

models.forEach(function (model) {
  db[model.name] = model; // Make sure the model has a 'name' property
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
