import 'dotenv/config';
import helmet from 'helmet';

import rateLimiter from './rateLimiter';

export default function registerPreprocessor(app) {
	app.disable('x-powered-by');
	if (process.env.NODE_ENV === 'production') {
		app.use(helmet());
		app.use(rateLimiter);
	}
}
