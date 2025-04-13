import { CommandService } from "../services/commands.service";
import { okResponse } from "../utils/successReponse";

export class CommandController {
    public static async getAll (req: any, res: any) {
        const deviceId = req.params.deviceId;
        const latest = req.query.latest === "true" ? true : false;
        if (latest) {
            const result = await CommandService.getLatest(deviceId);
            if (!result) {
                res.status(404).json({ message: "Commands not found" });
            }
            okResponse(res, "Get latest command successfully", result);
            return;
        }

        const result = await CommandService.getAll(deviceId);
        if (!result) {
            res.status(404).json({ message: "Commands not found" });
        }
        okResponse(res, "Get all commands successfully", result);
    }

    public static async create (req: any, res: any) {
        const device_id = req.params.deviceId;
        const command = req.body;
        const result = await CommandService.create(device_id, command);
        okResponse(res, "Command created successfully", result);
    }
}