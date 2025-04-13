import { BaseModel } from "./base.model";

export interface Command {
    id: string | null;
    device_id: string;
    command: string;
}

export class CommandModel extends BaseModel{
    public static async getAll(device_id: string) {
        try {
            const result = await this.prisma.deviceCommand.findMany({
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

    public static async getLatest(device_id: string) {
        try {
            const result = await this.prisma.deviceCommand.findFirst({
                where: {
                    device_id: device_id,
                },
                orderBy: {
                    created_at: 'desc',
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
            const result = await this.prisma.deviceCommand.findUnique({
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

    public static async create(device_id:string, command: Command) {
        try {
            const result = await this.prisma.deviceCommand.create({
                data: {
                    device_id: device_id,
                    command: command.command,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(
        id: string, 
        command: string | null = null) {
        let updateData: any = {}
        if (command) updateData = { ...updateData, command: command }
        try {
            const result = await this.prisma.deviceCommand.update({
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
            const result = await this.prisma.deviceCommand.delete({
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