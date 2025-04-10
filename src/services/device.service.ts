import { Device } from '../models/devices.model';
import { DeviceModel } from '../models/devices.model';


export class DeviceService {
    public static async getAll() {
        const result = await DeviceModel.getAll();
        console.log(result);
        return result;
    }

    public static async getById(id: string) {
        const result = await DeviceModel.getById(id);
        return result;
    }

    public static async create(device: Device) {
        const result = await DeviceModel.create(device);
        return result;
    }

    public static async update(
        id: string, 
        name: string | null = null, 
        type: string | null = null,
        room: string | null = null
    ) {
        const result = await DeviceModel.update(id, name, type, room);
        return result;
    }

    public static async delete(id: string) {
        const result = await DeviceModel.delete(id);
        return result;
    }
}
