import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from './../db/connection.js';
import usersModel from '../models/users.js';

const User = usersModel(sequelize);

const router = express.Router();

router.post('/login', async (req, res) => {
	console.log(process.env)
	const result = await User.findOne({where: {email: req.body.email}});
	if (result && result.dataValues.password === req.body.password) {
		const user =  (({ id, email, }) => ({ id, email }))(result.dataValues);
		// TODO: setup key from .env
		const token = jwt.sign({ user }, process.env.TOKEN_KEY, { expiresIn: 129600 });
		return res.cookie("token", token).json({
			success: true,
			err: null,
			message: "Logged in!",
			user,
		});
	}

	return res.json({
		success: false,
		err: 'LOGIN_ERR',
		message: "User password or email does not exist!",
		user,
	});
})

router.post('/logout', async (req, res) => {
	res.clearCookie("token");
	return res.json({
		success: true,
		err: null,
		message: "Logged Out!",
	});
})

router.get('/verify', (req,res) => {
	if (req.token) {
		return res.json({user: req.token.user, success: true});
	} else {
		return res.clearCookie("token").json({success: false});
	}
})


export default router;