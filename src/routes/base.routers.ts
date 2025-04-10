
import express from 'express';
// import { testRouter } from './tests.routers';
import { deviceRouter } from './devices.routers';
import { userRouter } from './users.routers';

class BaseRouter {
    public static base_path = '/api/v1';
    public static device_path = this.base_path + '/devices';
    public static user_path = this.base_path + '/users';
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use(BaseRouter.device_path, deviceRouter.router);
        this.router.use(BaseRouter.user_path, userRouter.router);
    }
}

export const baseRouter = new BaseRouter();