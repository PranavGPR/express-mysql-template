import logger from 'tools/logger';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, _req, res, _next) => {
	logger.error(err.message ?? err);

	if (err.errno === 1062 || 1136) {
		return res.status(StatusCodes.BAD_REQUEST).json({ errorCode: err.errno, error: err.message });
	}

	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: err.message ?? 'Something went wrong from our side. Please try again after some time.',
		error:
			process.env.NODE_ENV === 'production' ? undefined : { message: err.message, stack: err.stack }
	});

	logger.error(err.stack);
};

/**
 * Register the error handler
 * @param {*} ExpressAppInstance
 */
export default function handleServerErrors(app) {
	app.use(errorHandler);
}
