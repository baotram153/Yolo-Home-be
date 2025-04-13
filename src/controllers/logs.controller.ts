import { LogService } from "../services/logs.service";
import { okResponse } from "../utils/successReponse";

export class LogController {
    public static async getAll (req: any, res: any) {
        const deviceId = req.params.deviceId;

        const result = await LogService.getAll(deviceId);
        if (!result) {
            res.status(404).json({ message: "Logs not found" });
        }
        okResponse(res, "Get all logs successfully", result);
    }

    public static async getById (req: any, res: any) {
        const id = req.params.id;
        const result = await LogService.getById(id);
        if (!result) {
            res.status(404).json({ message: "Log not found" });
        }
        okResponse(res, `Log with id ${id} get successfully`, result);
    }

    public static async create (req: any, res: any) {
        const device_id = req.params.device_id;
        const log = req.body;
        const result = await LogService.create(device_id, log);
        okResponse(res, "Log created successfully", result);
    }

    public static async update (req: any, res: any) {
        const id = req.params.id;
        const { value } = req.body;
        const result = await LogService.update(id, value);
        if (!result) {
            res.status(404).json({ message: "Log not found" });
        }
        okResponse(res, "Log updated successfully", result);
    }

    public static async delete (req: any, res: any) {
        const id = req.params.id;
        const result = await LogService.delete(id);
        if (!result) {
            res.status(404).json({ message: "Log not found" });
        }
        okResponse(res, "Log deleted successfully", result);
    }
}