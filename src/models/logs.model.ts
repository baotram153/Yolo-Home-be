import { BaseModel } from "./base.model";

export interface Log {
    id: string | null;
    device_id: string | null;
    value: string;
}

export class LogModel extends BaseModel{
    public static async getAll(device_id: string) {
        try {
            const result = await this.prisma.deviceLog.findMany({
                where: {
                    device_id: device_id,
                },
            })
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getById(id: string) {
        try {
            const result = await this.prisma.deviceLog.findUnique({
                where: {
                    id: id,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async create(device_id:string, value: string) {
        try {
            const result = await this.prisma.deviceLog.create({
                data: {
                    device_id: device_id,
                    value: value,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(
        id: string, 
        value: string | null = null) {
        let updateData: any = {}
        if (value) updateData = { ...updateData, value: value }
        try {
            const result = await this.prisma.deviceLog.update({
                where: {
                    id: id,
                },
                data: updateData
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async delete (id: string) {
        try {
            const result = await this.prisma.deviceLog.delete({
                where: {
                    id: id,
                },
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }
}