import express from 'express';
import { BaseController } from './controllers/abstractions/base-controller';
import errorMiddleware from './middlewares/error.middleware';

export class App {
    public app: express.Application;
    public port: string | number;

    constructor (port: string | number, controllers: BaseController[]) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.listen();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());

    }

    private initializeControllers(controllers: BaseController[]) {
        this.app.get('/', (req, res) => {
            `<h1>The application is running on port ${this.port}</h1>`;
        });

        controllers.forEach(controllers => {
            this.app.use('/', controllers.router);  // define the absolute path of each controler's router
        })
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