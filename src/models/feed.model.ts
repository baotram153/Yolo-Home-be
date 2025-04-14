import { BaseModel } from './base.model';

export interface Feed {
    id: string | null;
    feed_name: string;
    description: string | null;
    device_id: string;
}

export class FeedModel extends BaseModel {
    public static async getAll() {
        try {
            const result = await this.prisma.feed.findMany()
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getByFeedName(name: string) {
        try {
            const result = await this.prisma.feed.findUnique({
                where: {
                    feed_name: name,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getByDeviceId(device_id: string) {
        try {
            const result = await this.prisma.feed.findMany({
                where: {
                    device_id: device_id,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }
}