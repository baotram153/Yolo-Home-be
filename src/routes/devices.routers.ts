import { Router } from 'express';
import { DeviceController } from '../controllers/devices.controller';

class DeviceRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', DeviceController.getAll);
        this.router.get('/', DeviceController.getByUserId);
        this.router.post('/', DeviceController.create);
        this.router.patch('/:id', DeviceController.update);
        this.router.delete('/:id', DeviceController.delete);
    }
}

export const deviceRouter = new DeviceRouter();