import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateBody = (validator, params = false) => {
	return (req, res, next) => {
		const { error } = validator(params ? req.params : req.body);
		if (error) return sendFailure(res, { error: error.details[0].message });

		next();
	};
};

export { default as responseSetters } from './responseSetters';
export { default as registerRouters } from './router';
