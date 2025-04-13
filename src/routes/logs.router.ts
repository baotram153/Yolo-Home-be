import { Router } from 'express';
import { LogController } from '../controllers/logs.controller';

class LogRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', DeviceController.getAll);
        this.router.get('/devices/:deviceId/logs', LogController.getAll);
        this.router.delete('/logs/:id', LogController.delete);
    }
}

export const logRouter = new LogRouter();