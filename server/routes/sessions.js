import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
	return res.json({fuck: 'no'});
})

export default router;