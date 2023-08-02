import jwt from 'jsonwebtoken';

export default (req, res, next) => {

	// if token exists means they could be logged in, we have to check if token is valid
	if (req.cookies.token) {
		jwt.verify(req.cookies.token, 'somekey', (err, decoded) => {
			if (err) {
				// if invalid, clear token
				res.token = undefined;
				return next();
			}
			// if valid parse it 
			req.token = decoded;
  		return next();
		});
	}
	// if no token, continue
	return next();
};
