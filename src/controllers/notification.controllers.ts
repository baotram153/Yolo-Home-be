import { NotificationService } from "../services/notification.service";
import { okResponse } from "../utils/successReponse";

export class NotificationController {

    public static async getByUserId (req: any, res: any) {
        const user = req.user;
        const result = await NotificationService.getById(user.user_id);
        if (!result) {
            res.status(404).json({ message: "Log not found" });
        }
        okResponse(res, `Notification of user ${user.user_id} get successfully.`, result);
    }

    // public static async create (req: any, res: any) {
    //     const user_id = req.user.user_id;
    //     const { value } = req.body;
    //     const result = await NotificationService.create(user_id, value);
    //     okResponse(res, "Notification created successfully", result);
    // }

    public static async update (req: any, res: any) {
        const id = req.params.id;
        const notification = req.body;
        const result = await NotificationService.update(id, notification);
        if (!result) {
            res.status(404).json({ message: "Notification not found" });
        }
        okResponse(res, "Notification updated successfully", result);
    }


    public static async delete (req: any, res: any) {
        const id = req.params.id;
        const result = await NotificationService.delete(id);
        if (!result) {
            res.status(404).json({ message: "Log not found" });
        }
        okResponse(res, "Log deleted successfully", result);
    }
}