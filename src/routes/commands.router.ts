import { Router } from 'express';
import { CommandController } from '../controllers/commands.controller';

class CommandRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', DeviceController.getAll);
        this.router.get('/devices/:deviceId/commands', CommandController.getAll);
        this.router.post('/devices/:deviceId/commands', CommandController.create);
    }
}

export const commandRouter = new CommandRouter();