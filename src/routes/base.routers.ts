
import express from 'express';
// import { testRouter } from './tests.routers';
import { deviceRouter } from './devices.routers';
import { userRouter } from './users.routers';
import { automationRouter } from './automations.router';
import { logRouter } from './logs.router';
import { commandRouter } from './commands.router';

class BaseRouter {
    public static base_path = '/api/v1';
    public static device_path = this.base_path + '/devices';
    public static user_path = this.base_path + '/users';
    public static automation_path = this.base_path;
    public static log_path = this.base_path
    public static command_path = this.base_path
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use(BaseRouter.device_path, deviceRouter.router);
        this.router.use(BaseRouter.user_path, userRouter.router);
        this.router.use(BaseRouter.automation_path, automationRouter.router);
        this.router.use(BaseRouter.log_path, logRouter.router);
        this.router.use(BaseRouter.command_path, commandRouter.router);
    }
}

export const baseRouter = new BaseRouter();