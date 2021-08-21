import 'dotenv/config';
import winston from 'winston';
import requestLogger from './requestLogger';

const { format, transports } = winston;
const { combine, colorize, printf, json, prettyPrint, timestamp } = format;

/**
 * Configures morgan request logging and adds the middleware.
 */
export function registerLogging(app) {
	if (process.env.logRequests) app.use(requestLogger());
}

function formatObject(param) {
	if (typeof param === 'string') {
		return param;
	}

	if (param instanceof Error) {
		return param.stack ? param.stack : JSON.stringify(param, null, 2);
	}

	return JSON.stringify(param, null, 2);
}

/**
 * Creates a customized console transport
 * @returns {*} WinstonConsoleTransport
 */
const prettyConsoleTransport = new transports.Console({
	format: combine(
		colorize(),
		json(),
		printf(info => {
			return `[${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString(
				'en-US'
			)}] ${info.level} | ${formatObject(info.message)}`;
		})
	)
});

/**
 * Creates file transport
 * @param {string} filename filepath to log
 * @param {string} level Logging level
 * @returns WinstonTransport
 */
const fileLogTransport = (filename, level) => {
	return new transports.File({
		filename,
		level,
		format: combine(json(), timestamp(), prettyPrint())
	});
};

/**
 * Get winston configs and transports based on environment
 * @param {string} environment
 * @returns {{transports: Array, exceptionHandlers: Array, rejectionHandlers: Array}}
 */
const getWinstonOptions = environment => {
	let winstonConfigs = {
		transports: [prettyConsoleTransport, fileLogTransport('logs/verbose.log', 'verbose')],
		exceptionHandlers: [prettyConsoleTransport, fileLogTransport('logs/exceptions.log', 'error')],
		rejectionHandlers: [prettyConsoleTransport, fileLogTransport('logs/rejections.log', 'warn')]
	};

	if (environment !== 'production') {
		// pop out file transports, log only on console
		for (const configProp of Object.keys(winstonConfigs)) {
			winstonConfigs[configProp].pop();
		}
	}

	return { level: process.env.loggingLevel, ...winstonConfigs };
};

/**
 * Configures winston logger
 */
const logger = winston.createLogger(getWinstonOptions(process.env.NODE_ENV));

export default logger;
