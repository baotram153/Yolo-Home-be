import { BaseController } from "./abstractions/base.controller";
import { AutomationService } from "../services/automation.service";
import { okResponse } from "../utils/successReponse";

export class AutomationController extends BaseController {
  public constructor() {
    super();
  }

  public static getAll = async (req: any, res: any) => {
    const deviceId = req.params.deviceId;
    const result = await AutomationService.getAll(deviceId);
    okResponse(res, "Get all automations successfully", result);
  };

  public static create = async (req: any, res: any) => {
    const deviceId = req.params.deviceId
    const automation = req.body;
    const result = await AutomationService.create(deviceId, automation);
    okResponse(res, "Automation created successfully", result);
  };

  public static update = async (req: any, res: any) => {
    const id = req.params.id;
    const { set_by_condition, set_by_time, condition, threshold, interval, start_time, end_time, status } = req.body;
    const result = await AutomationService.update(id, set_by_condition, set_by_time, condition, threshold, interval, start_time, end_time, status);
    okResponse(res, "Automation updated successfully", result);
  };

  public static delete = async (req: any, res: any) => {
    const id = req.params.id;
    const result = await AutomationService.delete(id);
    okResponse(res, "Automation deleted successfully", result);
  }
}