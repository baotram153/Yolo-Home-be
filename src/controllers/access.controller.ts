import { AccessService } from '../services/access.service';
import { okResponse } from '../utils/successReponse';
import { asyncHandler } from '../helper/asyncHandler';
import { BaseController } from './abstractions/base.controller';
import express from 'express';

export class AccessController extends BaseController{
    public constructor() {
        super();
    }

    public static register = async (req: any, res: any) => {
        console.log(req.body);
        const { username, password } = req.body;
        const result = await AccessService.register(username, password);
        if (!result) {
            return res.status(400).json({ message: 'User already exists' });
        }
        okResponse(res, 'User registered successfully', result)
    };
 
    public static login = async (req: any, res: any) => {
        const { username, password } = req.body;
        const result = await AccessService.login(username, password);
        if (!result) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        okResponse(res, 'User logged in successfully', result)
    };

    public static logout = async (req: any, res: any) => {
        // refresh token sent to server -> remove the token from database -> create a new refresh token in the next login
        const { refreshToken } = req.body;
        const result = await AccessService.logout(refreshToken);
        if (!result) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        okResponse(res, 'User logged out successfully', result)
    };

    public static refreshToken = async (req: any, res: any) => {
        const { refreshToken } = req.body;
        const result = await AccessService.refreshToken(refreshToken);
        if (!result) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        okResponse(res, 'Token refreshed successfully', result)
    };
}