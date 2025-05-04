// import { SocketIO } from "../websocket/initWebsocket";
import { Notification } from "../models/notification.model";    // import interface for
import { NotificationModel } from "../models/notification.model";

export class NotificationService {

    public static async getById(user_id: string) {
        const result = await NotificationModel.getByUserId(user_id);
        return result;
    }

    public static async create(user_id:string, notification: Notification) {
        // update data to database
        const result = await NotificationModel.create(user_id, notification);
        return result;
    }

    public static async update(id: string, notification: Notification) {
        const result = await NotificationModel.update(id, notification);
        return result;
    }


    public static async delete(id: string) {
        const result = await NotificationModel.delete(id);
        return result;
    }
}