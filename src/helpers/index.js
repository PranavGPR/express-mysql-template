import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { jwtPrivateKey } = process.env;

export const sendSuccess = (res, body) => {
	return res.status(StatusCodes.OK).json(body);
};

export const sendFailure = (res, body, code = StatusCodes.NOT_FOUND) => {
	return res.status(code).json(body);
};

export const validateBody = (validator, params = false) => {
	return (req, res, next) => {
		const { error } = validator(params ? req.params : req.body);
		if (error) return sendFailure(res, { error: error.details[0].message });

		next();
	};
};

export const generateToken = payload => {
	return jwt.sign(payload, jwtPrivateKey);
};
