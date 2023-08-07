import express from 'express';
import sequelize from '../db/connection.js';
import { QueryTypes } from 'sequelize';
import Url from '../models/url.js';

const router = express.Router();

//find all urls
router.get('/', async (req, res) => {
   const result = await Url.findAll();
  return res.json(result)
})

//remove url from database
router.post('/remove', async(req,res) =>{
  const result = await Url.destroy({ where: {id: req.body.id}});
 return res.status(200).json(result)
})

router.post('/edit', async (req, res) => {
  try {
    const { longUrl, shortUrl, id } = req.body;
    const url = await Url.update({long_url: longUrl, short_url: shortUrl}, {where: {id}});
    return res.status(200).json({
      success: true,
      err: null,
      message: "url changed",
    });
  } catch (error) {
    console.error('Error updating URL:', error);
    return res.status(500).json({ error: 'Error updating URL' });
  }
});

export default router;