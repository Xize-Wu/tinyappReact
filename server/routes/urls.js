import express from 'express';
import sequelize from '../db/connection.js';
import { QueryTypes } from 'sequelize';
import Url from '../models/url.js';

const router = express.Router();

//find all urls
router.get('/', async (req, res) => {
  // const result = await sequelize.query('SELECT urls.id, users.email, urls.long_url, urls.short_url FROM users JOIN "urls" ON users.id = urls.user_id', { type: QueryTypes.SELECT });
  const result = await Url.findAll();
  return res.json(result)
})

//remove url from database
router.post('/remove', async(req,res) =>{
  const result = await sequelize.query(`DELETE FROM urls WHERE id = ${req.body.id}`)
 return res.status(200).json(result)
})

router.post('/edit', async (req, res) => {
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

export default router;