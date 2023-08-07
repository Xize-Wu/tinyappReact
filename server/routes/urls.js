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

router.post('/', async (req, res) => {
  console.log("-------------------------------------")
  const { longUrl, shortUrl } = req.body.form;
  const id = req.token.user.id;

  try {
    const query = 'SELECT COUNT (*) FROM urls WHERE long_url =:longUrl AND user_id =:id'
    const replacements = { longUrl, id }
    const countLong = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT
    });
    if (countLong[0]['count'] !== '0') {
      return res.status(200).json('duplicate long url');
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
          const url = await Url.create({long_url: longUrl, short_url: shortUrl, user_id: id});
          const message = "url created";
          return res.status(200).json(url);
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

router.get('/my_url', async (req, res) => {
  const id = req.token.user.id;
  try {
    const result = await Url.findAll({where: { user_id: id}});
    return res.status(200).json(result);
  } catch (e) {
    console.error('Error updating URL:', error);
  }

})

export default router;