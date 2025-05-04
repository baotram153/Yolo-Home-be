import { UserModel } from "../models/users.model";
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
import { jwt } from '../authentication/authUtils';
import { User } from "../models/users.model";
import { UserSessionModel } from "../models/user_session.model";
import { access } from "node:fs";

export class AccessService {
    public static register = async (username: string, password: string) => {
        // check if user already exist
        
        const user = await UserModel.getByUsername(username);
        if (user) {
            console.log('User already exists');
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // create new user
        const newUser = await UserModel.create({
            username: username,
            password: hashedPassword,
            avatar_url: 'https://example.com/avatar.png'
        });

        if (!newUser) {
            console.log('Failed to create user');
            return null;
        }
        // remove password from user object
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    public static login = async (username: string, password: string) => {
        // check if user exist
        const user = await UserModel.getByUsername(username);
        if (!user) {
            console.log('User not found');
            return null
        }
        console.log(user)

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
        }

        // remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        // generate access token
        const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '24h';
        const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';

        const access_token = jwt.sign(
            { user_id: user.id, username: user.username },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: accessTokenExpiresIn})

        // generate refresh token
        const refresh_token = jwt.sign(
            { user_id: user.id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: refreshTokenExpiresIn})

        // preprocess the expire time string: 15m, 24h
        const amount = parseInt(refreshTokenExpiresIn.slice(0, -1), 10);
        const unit = refreshTokenExpiresIn.slice(-1);
        let expiresAt: Date = new Date(); // default value to avoid uninitialized variable
        switch (unit) {
            case 's': expiresAt = new Date(Date.now() + amount * 1000); break;
            case 'm': expiresAt = new Date(Date.now() + amount * 60 * 1000); break;
            case 'h': expiresAt = new Date(Date.now() + amount * 60 * 60 * 1000); break;
            case 'd': expiresAt = new Date(Date.now() + amount * 24 * 60 * 60 * 1000); break;
            default: console.warn('Invalid time unit for refresh token expiration'); break;
        }

        // delete expired sessions before creating a new one
        const deletedSessions = await UserSessionModel.deleteExpiredSessions();
        console.log('Deleted expired sessions: ', deletedSessions)

        // create new session in database
        const session = await UserSessionModel.createSession(user.id, refresh_token, expiresAt);
        if (!session) {
            console.log('Failed to create session');
            return null;
        }


        // send tokens to client
        return {
            access_token: access_token,
            refresh_token: refresh_token,
            ... userWithoutPassword
        }
    }

    public static logout = async (refreshToken: string) => {
        // remove refresh token from database
        const result = await UserSessionModel.removeSession(refreshToken);
        if (!result) {
            console.log('The session has already expired and removed from database');
            return null;
        }
        return result;
    }

    public static refreshToken = async (refreshToken: string) => {
        // check if refresh token is valid
        let user : {userId: string, username: string} = {userId: '', username: ''};
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err: any, userData: any) => {
            if (err) {
                console.log('Invalid refresh token');
                return null;
            }
            user = userData
        })
        console.log(user)

        // check if refresh token is in database
        const session = await UserSessionModel.getByToken(refreshToken);
        if (!session) {
            console.log('Refresh token not found in database');
            return null;
        }

        // create and return a new access token
        const access_token = jwt.sign(
            { user_id: user.userId, username: user.username },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        )

        return access_token
    }

}