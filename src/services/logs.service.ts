import { Log } from "../models/logs.model";
import { LogModel } from "../models/logs.model";
import { FeedModel } from "../models/feed.model";
import { DeviceModel } from "../models/devices.model";

import { SocketIO } from "../websocket/initWebsocket";
import { Notification } from "../models/notification.model";    // import interface for
import { NotificationModel } from "../models/notification.model";

export class LogService {
    public static async getAll(device_id: string) {
        const result = await LogModel.getAll(device_id);
        return result;
    }

    public static async getById(id: string) {
        const result = await LogModel.getById(id);
        return result;
    }

    public static async create(device_id:string, value: string) {
        // update data to database
        const result = await LogModel.create(device_id, value);

        return result;
    }

    public static async update(
        id: string, 
        value: string | null = null) {
        const result = await LogModel.update(id, value);
        return result;
    }

    public static async delete(id: string) {
        const result = await LogModel.delete(id);
        return result;
    }

    public static async createFromFeed(feed: string, value: string) {
        // check if the feed exists in database -> get device Id
        console.log("Feed name: ", feed)
        const feedInfo = await FeedModel.getByFeedName(feed);
        if (!feedInfo) {
            console.log("Feed not found")
            return null;
        };
        const device_id = feedInfo.device_id;

        const deviceInfo = await DeviceModel.getById(device_id);
        if (!deviceInfo) {
            console.log("Failed to get device info")
            return null;
        };

        // TODO: enable to set a threshold for each device type (add attribute min threshold max threshold to device table)
        console.log("Device type: ", deviceInfo.type)
        if (deviceInfo.type?.toLowerCase() == "thermostat" && parseInt(value) > 40) {
            console.log("Temperature is too high")
            // TODO: set adjustable threshold
            const temp_noti: Notification = {
                id: null,
                user_id: deviceInfo.user_id,
                type: "warning",
                header: "Temperature Alert",
                status: "unread",
                description: `Temperature is too high: ${value}C, exceeds 40C`,
            }
            const result = await NotificationModel.create(deviceInfo.user_id, temp_noti)
            // console.log("Notification: ", notification)
            // console.log("User id: ", deviceInfo.user_id)
            // console.log("Sending notification to user...")
            SocketIO.sendMessageToUser(deviceInfo.user_id, "notification", result);
        }

        // create log in database
        const result  = await this.create(device_id, value);

        console.log("Log created: ", result)

        return result;
    }
}