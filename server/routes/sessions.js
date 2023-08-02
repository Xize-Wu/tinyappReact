import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const user = {email: 'a@b.ca', password: '1234'};

router.post('/login', async (req, res) => {
	console.log(req.body);
	// TODO: setup this login with actual database
	if (user.email === req.body.email && user.password === req.body.password) {
		// TODO: setup key from .env
		const token = jwt.sign({ user }, 'somekey', { expiresIn: 129600 });
		return res.cookie("token", token).json({
			success: true,
			err: null,
			message: "Logged in!",
			user,
		});
	}

	return res.json({fuck: 'no'});
})

router.post('/logout', async (req, res) => {
	res.clearCookie("token");
	return res.json({
		success: true,
		err: null,
		message: "Logged Out!",
		user,
	});
})

router.get('/verify', (req,res) => {
	console.log("TOKEN!!");
	console.log(req.token); 

	if (req.token) {
		return res.json({user: req.token, success: true});
	} else {
		return res.clearCookie("token").json({success: false});
	}
})


export default router;