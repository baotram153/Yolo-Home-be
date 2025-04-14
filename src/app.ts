import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import { RequestHandler } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { AdafruitIO } from './adafruit/initConnection';
import { Authentication } from './authentication/authUtils';
// import dotenv from "dotenv";

// dotenv.config()

export class App {
    public app: express.Application;
    public port: string | number;
    public adafruitClient: AdafruitIO;

    constructor (port: string | number,access_routers:any, other_routers: any) {
        this.app = express();
        this.port = port;

        // initialize mqtt
        const ADAFRUIT_USERNAME = process.env.ADAFRUIT_USERNAME
        const ADAFRUIT_KEY = process.env.ADAFRUIT_KEY

        if (!ADAFRUIT_USERNAME) {
            throw new Error("Missing API_USERNAME in environment variables");
        }
        if (!ADAFRUIT_KEY) {
            throw new Error("Missing API_KEY in environment variables");
        }   

        this.adafruitClient= new AdafruitIO(ADAFRUIT_USERNAME, ADAFRUIT_KEY, ['BBC_TEMP', 'humility', 'FAN', 'DOOR']);
        this.initializeAccessRouters(access_routers);
        this.initializeMiddlewares();
        this.initializeRouters(other_routers);
        this.initializeErrorHandling();
        this.listen();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(Authentication.authenticateUser);  // add authentication middleware to all routes
    }

    private initializeAccessRouters(routers: any) {
        // initialize access routers before authentication middleware
        routers.forEach((router: { router: express.Router }) => {
            this.app.use('/api/v1/access', router.router);  // define the absolute path of each controler's router
        })
    }

    private initializeRouters(routers: any) {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send('Hello World!');
            console.log('The app is running on port: ', this.port);
        })

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