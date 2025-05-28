import express from 'express';
import { BaseController } from './abstractions/base.controller';
import { UserNotFoundException } from '../exceptions/not-found-exception';
import { UserService } from '../services/users.service';
import { okResponse } from '../utils/successReponse';

export class UserController extends BaseController {

    public constructor() {
        super();
    }

    public static create = async (req: express.Request, res: express.Response) => {
        const user = req.body;
        const result = await UserService.create(user);
        okResponse(res, "User created successfully", result);
    }

    public static getAll = async (req: express.Request, res: express.Response) => {
        // const result = await UserService.getAll();
        const user = req.user;
        console.log("User:", user);
        okResponse(res, "Get User Info successfully", user);
    }

    public static getById = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const id = req.params.id;
        const result = await UserService.getById(id);
        if (!result) {
            next(new UserNotFoundException(id));
        } else {
            okResponse(res, `User with id ${id} get successfully`, result);
        }
    }; 

    public static update = async (req: express.Request, res: express.Response) => {
        // if req.body.favoriteNumber is undefined, it will be null
        const id = req.params.id;
        const { username, avatar_url, password } = req.body;
        const result = await UserService.update(id, username, avatar_url, password);
        okResponse(res, "User updated successfully", result);
    }

    public static delete = async (
        req: express.Request, 
        res: express.Response, 
        next: express.NextFunction
    ) => {
        const id = req.params.id;
        const result = await UserService.delete(id);
        if (!result) {
            next(new UserNotFoundException(id));
        } else {
            okResponse(res, "User deleted successfully", result);
        }
    }

    public static getAllDevices = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const id = req.params.userId;
        const result = await UserService.getAllDevices(id);
        if (!result) {
            next(new UserNotFoundException(id));
        } else {
            okResponse(res, `Get all devices with userId ${id} successfully`, result);
        }
    }
}