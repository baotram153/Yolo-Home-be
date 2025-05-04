import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controllers';

class NotificationRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', DeviceController.getAll);
        this.router.get('/', NotificationController.getByUserId);
        this.router.delete('/:id', NotificationController.delete);
        this.router.patch('/:id', NotificationController.update);
    }
}

export const notificationRouter = new NotificationRouter();