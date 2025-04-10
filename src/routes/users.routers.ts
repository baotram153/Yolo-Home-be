import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

class UserRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', UserController.getAll);
        this.router.get('/:id', UserController.getById);
        this.router.post('/', UserController.create);
        this.router.patch('/:id', UserController.update);
        this.router.delete('/:id', UserController.delete);
        this.router.get('/:userId/devices', UserController.getAllDevices);
    }
}

export const userRouter = new UserRouter();