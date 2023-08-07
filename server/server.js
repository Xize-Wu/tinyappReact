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

app.get('/my_url', async (req, res) => {
  const result = await sequelize.query('SELECT urls.id, users.email, urls.long_url, urls.short_url FROM users JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT })
  console.log(result)

  return res.json(result)
})

//remove url from database
app.post('/remove', async (req, res) => {
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

    return res.status(200).json({ hello: 'world' });
  } catch (error) {
    console.error('Error updating URL:', error);
    return res.status(500).json({ error: 'Error updating URL' });
  }
});

app.post('/create', async (req, res) => {
  console.log("-------------------------------------")
  const { longUrl, shortUrl } = req.body.form;
  const id = req.token.user.id

  try {
    const query = 'SELECT COUNT (*) FROM urls WHERE long_url =:longUrl AND user_id =:id'
    const replacements = { longUrl, id }
    const countLong = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT
    })
    if (countLong[0]['count'] !== '0') {
      return res.status(200).json('duplicate long url')
    } else {
      try {
        const shortQuery = 'SELECT COUNT (*) FROM urls WHERE short_url =:shortUrl'
        const replacements = { shortUrl, id }
        const countShort = await sequelize.query(shortQuery, {
          replacements,
          type: QueryTypes.SELECT
        })
        console.log(countShort[0]['count'], 'short url')
        if (countShort[0]['count'] !== '0') {
          return res.status(200).json('duplicate short url')
        } else {
          const createQuery = 'INSERT INTO urls (long_url, short_url) VALUES (:longUrl, :shortUrl)'
          const replacements = {longUrl, shortUrl}
          const createUrl = await sequelize.query(createQuery, {
            replacements,
            type:QueryTypes.INSERT
          })
          createUrl()
          const message = "url created"
          return res.status(200).json(createUrl);
        }

      } catch (error) {
        console.error('Error creating URL:', error);
        return res.status(500).json({ error: 'Error creating URL' });
      }
    }

  } catch (error) {
    console.error('Error creating URL:', error);
    return res.status(500).json({ error: 'Error creating URL' });
  }
})

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));