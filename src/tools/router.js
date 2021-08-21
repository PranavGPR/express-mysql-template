import { errorHandler } from 'middlewares';
import { PingRouter, AdminRouter, CustomerRouter, RestaurantRouter } from 'routers';

export default function registerRouters(app) {
	app.use('/ping', PingRouter);
	app.use('/admin', AdminRouter);
	app.use('/customer', CustomerRouter);
	app.use('/restaurant', RestaurantRouter);

	app.use(errorHandler);
}
