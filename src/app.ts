import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import { RequestHandler } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class App {
    public app: express.Application;
    public port: string | number;

    constructor (port: string | number, routers: any) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRouters(routers);
        this.initializeErrorHandling();
        this.listen();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());

    }

    private initializeRouters(routers: any) {
        this.app.get('/', (req, res) => {
            `<h1>The application is running on port ${this.port}</h1>`;
        });

        routers.forEach((router: { router: express.Router }) => {
            this.app.use('/', router.router);  // define the absolute path of each controler's router
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}