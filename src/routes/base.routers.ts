
import express from 'express';
import { testRouter } from './tests.routers';

class BaseRouter {
    public static test_path = '/test';
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.use(BaseRouter.test_path, testRouter.router);
    }
}

export const baseRouter = new BaseRouter();