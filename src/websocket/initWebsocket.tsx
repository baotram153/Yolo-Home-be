import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import http from 'http';
import { AccessService } from '../services/access.service';

export class SocketIO {
    private static io: Server | null = null; // initialize io to null

    constructor(httpServer: http.Server) {
        this.init(httpServer);
    }

    private init(httpServer: http.Server) {
        SocketIO.io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        // console.log(io)
        // TODO: add next : requesthandler later
        SocketIO.io.use(async (socket: Socket, next) => {
            // get token from auth field and decode for user_id
            const authHeader = socket.handshake.headers['Authorization'];
            // console.log('Auth header: ', authHeader);
            try {
                const token = socket.handshake.auth?.token ?? (typeof authHeader === 'string' ? authHeader.replace('Bearer ', '') : (Array.isArray(authHeader) ? authHeader[0].replace('Bearer ', '') : ''));
                if (!token) {
                    console.log('Authentication error: no token provided');
                }
                const user = await AccessService.verifyAccessToken(token);
                if (!user) {
                    console.log('Authentication error: invalid token');
                    socket.disconnect(true); // disconnect the socket if token is invalid
                }
                (socket as any).user = user;    // add user (username, user_id) to socket object
                socket.join(user.user_id);      // join the socket to the room with user_id
                console.log('Socket joined room: ', user.user_id); // log the room joined by the socket
                next();
            }
            catch (error) {
                console.log('Authentication error: ', error);
            }
        })

        SocketIO.io.on('connection', (socket: Socket) => {
            console.log('A user connected: ', socket.id);
            console.log('User: ', (socket as any).user); // log the user corresponding to the socket

            // print to console when user is disconnected
            socket.on('disconnect', () => {
                console.log('A user disconnected: ', socket.id);
            });

            // announce connection success to client
            socket.emit('connected', { message: 'Connected to server successfully!' });

            // this code is for receiving data from client
            // socket.on('get-noti', ({noti}) => {
            //     console.log("Message from client: ", noti);
            // })
        })

        // set interval to send data to the client every 5 seconds
        // setInterval(() => {
        //     console.log('Sending data to the client...');
        //     io.emit('connected', {message: "This is a message"}); // emit a message to the client when connected
        // }, 5000); // send data to the client every 5 seconds


        SocketIO.io.on('disconnect', (socket: Socket) => {
            console.log('A user disconnected: ', socket.id);
        })
    }

    public static sendMessageToUser(userId: string, event: string, message: any) {
        console.log("Event: ", event)
        console.log("Message: ", message)
        console.log("UserId: ", userId)
        if (SocketIO.io) {
            SocketIO.io.to(userId).emit(event, message); // send message to the user with userId
        }
    }

    public static getIO() {
        return SocketIO.io; // return the io instance
    }
}