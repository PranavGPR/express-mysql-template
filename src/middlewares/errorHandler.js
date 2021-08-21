import logger from 'tools/logger';
import { StatusCodes } from 'http-status-codes';

export default (err, req, res, next) => {
	logger.error(err.message ?? err);

	if (err.errno === 1062 || 1136) {
		return res.status(StatusCodes.BAD_REQUEST).json({ errorCode: err.errno, error: err.message });
	}

	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		error: err.message ?? 'Something went wrong from our side. Please try again after some time.'
	});
	next(err);
};
