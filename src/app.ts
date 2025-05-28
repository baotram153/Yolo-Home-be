import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import { RequestHandler } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { AdafruitIO } from './adafruit/initConnection';
import { Authentication } from './authentication/authUtils';
const cors = require('cors');

// libs for voice command
import { speechRouter } from './routes/speech.router';
import { userRouter } from './routes/users.routers';

// libs for websocket connection
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';
import http from 'http';
import { AccessService } from './services/access.service';
import { SocketIO } from './websocket/initWebsocket';

export class App {
    public app: express.Application;
    public server: http.Server;
    // public io: Server;
    public socketIO: SocketIO;
    public port: string | number;
    // public adafruitClient: AdafruitIO;

    constructor (port: string | number, access_routers:any, other_routers: any) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app); // create a http server
        this.server.listen(3000, () => {
            console.log(`Server is running on port 3000`);
        });


        console.log(this.server.address())
        // this.io = this.initializeWebSocket(this.server); // create a websocket server
        this.socketIO = this.initializeWebSocket(this.server); // create a websocket server
        // this.adafruitClient = this.initializeAdafruitIO();
        this.app.post('/api/v1/speech', speechRouter.router) // TODO: move this to base router
        this.initializeMiddlewares();
        this.initializeAccessRouters(access_routers);
        this.app.use(Authentication.authenticateUser);  // add authentication middleware to all routes
        this.initializeRouters(other_routers);
        this.app.use('/api/v1/info', userRouter.router); // TODO: move this to base router=
        this.initializeErrorHandling();
        // this.listen()
    }

    private initializeWebSocket(httpServer: http.Server) {     // create a websocket server
        return new SocketIO(httpServer);
    }

    private initializeAdafruitIO(this: App) {
        const ADAFRUIT_USERNAME = process.env.ADAFRUIT_USERNAME
        const ADAFRUIT_KEY = process.env.ADAFRUIT_KEY

        if (!ADAFRUIT_USERNAME) {
            throw new Error("Missing API_USERNAME in environment variables");
        }
        if (!ADAFRUIT_KEY) {
            throw new Error("Missing API_KEY in environment variables");
        }   

        return new AdafruitIO(ADAFRUIT_USERNAME, ADAFRUIT_KEY, ['BBC_TEMP', 'humility', 'FAN', 'DOOR']);
    }

    private initializeMiddlewares() {
        this.app.use(cors({
            origin: "*"
        }))
        this.app.use(express.json());
    }

    private initializeAccessRouters(routers: any) {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send('Hello World!');
            console.log('The app is running on port: ', this.port);
        })
        
        // initialize access routers before authentication middleware
        routers.forEach((router: { router: express.Router }) => {
            this.app.use('/api/v1/access', router.router);  // define the absolute path of each controler's router
        })
    }

    private initializeRouters(routers: any) {

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