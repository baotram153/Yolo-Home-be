import { Log } from "../models/logs.model";
import { LogModel } from "../models/logs.model";

export class LogService {
    public static async getAll(device_id: string) {
        const result = await LogModel.getAll(device_id);
        return result;
    }

    public static async getById(id: string) {
        const result = await LogModel.getById(id);
        return result;
    }

    public static async create(device_id:string, log: Log) {
        const result = await LogModel.create(device_id, log);
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
}