const PORT = 8080;
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sessionVerify from './middlware/sessionVerify.js';
import sequelize from './db/connection.js';
import { QueryTypes } from 'sequelize';

// routes

import sessionRoutes from './routes/sessions.js';
import db from './models/index.js';

const app = express();

const corsOptions = {
	origin: process.env.ORIGIN,
	optionsSuccessStatus: 200,
  credentials: true
};

// middleware 
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use(sessionVerify);

app.use('/sessions', sessionRoutes);


app.get("/test", async (req, res) => {
  return res.json({ hello: 'world' })
})

app.post("/test", async (req, res) => {
  console.log(req)
  return res.json("Emotional damage!")
})

//find all urls
app.get('/all_urls', async (req, res) => {
  const result = await sequelize.query('SELECT urls.id, users.email, urls.long_url, urls.short_url FROM users JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT });
  return res.json(result)
})

app.get('/my_url', async (req,res) =>{
  const result = await sequelize.query('SELECT urls.id, users.email, urls.long_url, urls.short_url FROM users JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT })
  console.log(result)
  
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