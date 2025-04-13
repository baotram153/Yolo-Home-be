import express from 'express';
import { BaseController } from './abstractions/base.controller';
import { DeviceNotFoundException } from '../exceptions/not-found-exception';
import { DeviceService } from '../services/device.service';
import { okResponse } from '../utils/successReponse';

export class DeviceController extends BaseController {

    public constructor() {
        super();
    }

    public static create = async (req: express.Request, res: express.Response) => {
        console.log(req.user)
        const user_id = req.user.user_id;
        const device = req.body;
        const result = await DeviceService.create(user_id, device);
        okResponse(res, "Device created successfully", result);
    }

    public static getAll = async (req: express.Request, res: express.Response) => {
        const result = await DeviceService.getAll();
        console.log(result);
        okResponse(res, "Get all devices successfully", result);
    }

    public static getById = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const id = req.params.id;
        const result = await DeviceService.getById(id);
        if (!result) {
            next(new DeviceNotFoundException(id));
        } else {
            okResponse(res, `Device with id ${id} get successfully`, result);
        }
    }; 

    public static getByUserId = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.log(req.user)
        const id = req.user.user_id;
        const result = await DeviceService.getByUserId(id);
        if (!result) {
            next(new DeviceNotFoundException(id));
        } else {
            okResponse(res, `Device with user id ${id} get successfully`, result);
        }
    }

    public static update = async (req: express.Request, res: express.Response) => {
        // if req.body.favoriteNumber is undefined, it will be null
        const id = req.params.id;
        const { name, type, room } = req.body;
        const result = await DeviceService.update(id, name, type, room);
        okResponse(res, "Device updated successfully", result);
    }

    public static delete = async (
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction
    ) => {
        const id = req.params.id;
        const result = await DeviceService.delete(id);
        if (!result) {
            next(new DeviceNotFoundException(id));
        } else {
            okResponse(res, "Device deleted successfully", result);
        }
    }
}