import { BaseModel } from './base.model';
// import { DeviceNotFoundException } from '../exceptions/not-found-exception';

export interface Device {
    id: string,
    name: string,
    type: string,
    userId: string,
    room: string
}

export class DeviceModel extends BaseModel {
    public static async getAll() {
        try {
            const result = await this.prisma.device.findMany()
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        
    }


    public static async create(device: Device) {
        try {
            const result = await this.prisma.device.create({
                data: {
                    name: device.name,
                    type: device.type,
                    userId: device.userId,
                    room: device.room,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async getById(id: string) {
        try {
            const result = await this.prisma.device.findUnique({
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

    public static async delete(id: string) {
        try {
            const result = await this.prisma.device.delete({
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

    public static async update(
        id: string, 
        name: string | null = null, 
        type: string | null = null,
        room: string | null = null
    ) {
        let updateData = {}
        if (name) { updateData = { ...updateData, name: name } }
        if (type) { updateData = { ...updateData, type: type } }
        if (room) { updateData = { ...updateData, room: room } }
        try {
            const result = this.prisma.device.update({
                where: {
                    id: id,
                },
                data: updateData
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }
}