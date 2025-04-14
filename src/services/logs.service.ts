import { Log } from "../models/logs.model";
import { LogModel } from "../models/logs.model";
import { FeedModel } from "../models/feed.model";


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

        // create log in database
        const result  = this.create(device_id, value);
        return result;
    }
}