import { Automation } from "../models/automation.model";
import { AutomationModel } from "../models/automation.model";

export class AutomationService {
    public static async getAll(device_id:string) {
        const result = await AutomationModel.getAll(device_id);
        console.log(result);
        return result;
    }

    public static async create(device_id:string, automation: Automation) {
        const result = await AutomationModel.create(device_id, automation);
        return result;
    }

    public static async update(
        id: string, 
        set_by_condition: boolean | null = null,
        set_by_time: boolean | null = null,
        condition: string | null = null,
        threshold: number | null = null,
        interval: number | null = null,
        start_time: Date | null = null,
        end_time: Date | null = null,
        status: string | null = null
    ) {
        const result = await AutomationModel.update(id, set_by_condition, set_by_time, condition, threshold, interval, start_time, end_time, status);
        return result;
    }

    public static async delete(id: string) {
        const result = await AutomationModel.delete(id);
        return result;
    }
}
