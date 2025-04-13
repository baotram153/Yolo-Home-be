import { Router } from 'express';
import * as express from 'express';             
import { AccessController } from '../controllers/access.controller';

class AccessRouter {
    public router: Router = Router();

    public constructor() {
        this.router.use(express.json())
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/register', AccessController.register);
        this.router.post('/login', AccessController.login);
        this.router.post('/logout', AccessController.logout);
        this.router.post('/token/refresh', AccessController.refreshToken);
    }
}

export const accessRouter = new AccessRouter(); 