import { BaseModel } from "./base.model";

export interface Automation {
    id: string | null;
    set_by_condition: boolean;
    set_by_time: boolean;
    condition: string;
    upper_bound: number;
    lower_bound: number;
    interval: number;
    start_time: Date;
    end_time: Date;
    status: string;
    device_id: string;
}

export class AutomationModel extends BaseModel{

    public static async getAll(device_id: string) {
        try {
            const result = await this.prisma.automationScenario.findMany({
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

    public static async create(device_id:string, automation: Automation) {
        try {
            const result = await this.prisma.automationScenario.create({
                data: {
                    device_id: device_id,
                    set_by_condition: automation.set_by_condition,
                    set_by_time: automation.set_by_time,
                    condition: automation.condition,
                    upper_bound: automation.upper_bound,
                    lower_bound: automation.lower_bound,
                    interval: automation.interval,
                    start_time: automation.start_time,
                    end_time: automation.end_time,
                    status: automation.status,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(
        id: string, 
        set_by_condition: boolean | null, 
        set_by_time: boolean | null, 
        condition: string | null, 
        upper_bound: number | null,
        lower_bound: number | null,
        interval: number | null, 
        start_time: Date | null, 
        end_time: Date | null,
        status: string | null) {
        try {
            let updateData: any = {}
            if (set_by_condition) updateData = {...updateData, set_by_condition: set_by_condition}
            if (set_by_time) updateData = {...updateData, set_by_time: set_by_time}
            if (condition) updateData = {...updateData, condition: condition}
            if (upper_bound) updateData = {...updateData, upper_bound: upper_bound}
            if (lower_bound) updateData = {...updateData, lower_bound: lower_bound}
            if (interval) updateData = {...updateData, interval: interval}
            if (start_time) updateData = {...updateData, start_time: start_time}
            if (end_time) updateData = {...updateData, end_time: end_time}
            if (status) updateData = {...updateData, status: status}

            const result = await this.prisma.automationScenario.update({
                where: {
                    id: id
                },
                data: updateData,
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async delete (id: string) {
        try {
            const result = await this.prisma.automationScenario.delete({
                where: {
                    id: id,
                },
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async getByCondition(condition: string) {
        try {
            const result = await this.prisma.automationScenario.findMany({
                where: {
                    condition: condition,
                },
            })
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
}