import { Router } from 'express';
import { AutomationController } from '../controllers/automation.controller';


class AutomationRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', DeviceController.getAll);
        this.router.get('/devices/:deviceId/automations', AutomationController.getAll);
        this.router.post('/devices/:deviceId/automations', AutomationController.create);
        this.router.patch('/automations/:id', AutomationController.update);
        this.router.delete('/automations/:id', AutomationController.delete);
    }
}

export const automationRouter = new AutomationRouter();