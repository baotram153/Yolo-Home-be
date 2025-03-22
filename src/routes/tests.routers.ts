import { Router } from 'express';
import { TestController } from '../controllers/tests.controller';

class TestRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', TestController.getAll);
        this.router.get('/:id', TestController.getById);
        this.router.post('/', TestController.create);
        // this.router.put('/test/:id', testController.update);
        this.router.delete('/:id', TestController.delete);
    }
}

export const testRouter = new TestRouter();