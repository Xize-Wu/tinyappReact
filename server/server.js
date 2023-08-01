const PORT = 8080;


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Sequelize, QueryTypes } from 'sequelize';
import db from './models/index.js';

const sequelize = new Sequelize('postgres://labber:labber@localhost:5432/tinyapp') // Example for postgres

const app = express();

app.use(cors())

// middleware 
app.use(morgan('dev'));



app.get("/test", async (req, res) => {
  return res.json({ hello: 'world' })
})

app.post("/test", async (req, res) => {
  console.log(req)
  return res.json("Emotional damage!")
})

//sequelize connection test
try {
  await sequelize.authenticate();
  console.log('Fuiyoh! Connection has been established successfully.');
} catch (error) {
  console.error('Haiyaa... Unable to connect to the database:', error);
}

//find all test
app.get('/all_urls', async (req, res) => {
  // const urlsModel = db.urls;
  const result = await sequelize.query('SELECT * FROM "users" JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT });
  return res.json(result)
})

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));