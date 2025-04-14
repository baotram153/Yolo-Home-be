import { Command } from "../models/commands.model";
import { CommandModel } from "../models/commands.model";
import { FeedModel } from "../models/feed.model";
import { app } from "../index";

export class CommandService {
    public static async getAll (device_id: string) {
        const result = await CommandModel.getAll(device_id);
        return result;
    }

    public static async getLatest (device_id: string) {
        const result = await CommandModel.getLatest(device_id);
        return result;
    }

    public static async create (device_id:string, command: Command) {
        const result = await CommandModel.create(device_id, command);
        // hardcoded
        // if (device_id == '32f772bc-99a5-4fc9-8bd8-683775d1e13e') {
        //     app.adafruitClient.client.publish(`${process.env.ADAFRUIT_USERNAME}/feeds/FAN`, command.command);
        //     console.log('Published')
        // }
        // if (device_id == '3648ec32-17ee-4b91-b425-7edb71983077') {
        //     app.adafruitClient.client.publish(`${process.env.ADAFRUIT_USERNAME}/feeds/DOOR`, command.command);
        //     console.log('Published')
        // }

        // check if device_id is connected to a feed in adafruit
        const feedInfo = await FeedModel.getByDeviceId(device_id);
        if (!feedInfo || feedInfo.length === 0) {
            console.log("There is no feed connected to this device_id")
        }
        else {
            feedInfo.forEach((feed) => {
                console.log("Feed name: ", feed.feed_name)
                app.adafruitClient.client.publish(`${process.env.ADAFRUIT_USERNAME}/feeds/${feed.feed_name}`, command.command);
                console.log('Published')
            })
            
        }
        return result;
    }
}