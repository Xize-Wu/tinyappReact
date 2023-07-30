import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
	console.log(req.body);
	return res.json({fuck: 'no'});
})

export default router;