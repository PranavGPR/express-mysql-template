import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

const { jwtPrivateKey } = process.env;

export default (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

	if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Access denied.' });

	try {
		const decoded = jwt.verify(token, jwtPrivateKey);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid token' });
	}
};
