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
app.use(express.json());



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

//find all urls
app.get('/all_urls', async (req, res) => {
  const result = await sequelize.query('SELECT urls.id, users.email, urls.long_url, urls.short_url FROM users JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT });
  return res.json(result)
})

//remove url from database
app.post('/remove', async(req,res) =>{
  const result = await sequelize.query(`DELETE FROM urls WHERE id = ${req.body.id}`)
 return res.status(200).json(result)
})

app.post('/edit', async (req, res) => {
  const { longUrl, shortUrl, id } = req.body;

  try {
    const query = 'UPDATE urls SET long_url = :longUrl, short_url = :shortUrl WHERE id = :id';
    const replacements = { longUrl, shortUrl, id };

    const result = await sequelize.query(query, {
      replacements,
      type: QueryTypes.UPDATE,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating URL:', error);
    return res.status(500).json({ error: 'Error updating URL' });
  }
});

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));