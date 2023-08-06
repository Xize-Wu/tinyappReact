import jwt from 'jsonwebtoken';

export default (req, res, next) => {

	if (req.cookies.token) {
		jwt.verify(req.cookies.token, process.env.TOKEN_KEY, (err, decoded) => {
			if (err) {
				// if invalid, clear token
				res.token = undefined;
				return next();
			}
			// if valid parse it 
			req.token = decoded;
  		return next();
		});
	} else {
		return next();
	}
};
