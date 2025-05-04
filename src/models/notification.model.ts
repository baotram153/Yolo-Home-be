import { BaseModel } from "./base.model";

export interface Notification {
    id            : string | null;
    user_id       : string;
    type          : string;
    header        : string;
    status        : string;
    description   : string | null;
}

export class NotificationModel extends BaseModel {

    public static async getByUserId(user_id: string) {
        try {
            const result = await this.prisma.notification.findMany({
                where: {
                    user_id: user_id,
                }
            })
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async create (user_id: string, notification: Notification) {
        try {
            const result = await this.prisma.notification.create({
                data: {
                    user_id: user_id,
                    type: notification.type,
                    header: notification.header,
                    status: notification.status,
                    description: notification.description,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(id: string, notification: Notification) {
        console.log(notification)
        try {
            const result = await this.prisma.notification.update({
                where: {
                    id: id,
                },
                data: {
                    type: notification.type,
                    header: notification.header,
                    status: notification.status,
                    description: notification.description,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async delete (id: string) {
        try {
            const result = await this.prisma.notification.delete({
                where: {
                    id: id,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }
}