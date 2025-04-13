import { Command } from "../models/commands.model";
import { CommandModel } from "../models/commands.model";

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
        return result;
    }
}