import express from 'express';
import { BaseController } from './abstractions/base.controller';
import { TestNotFoundException } from '../exceptions/not-found-exception';
import test from 'node:test';
import { error } from 'console';

export class TestController extends BaseController {

    public constructor() {
        super();
    }

    public static create = async (req: express.Request, res: express.Response) => {
        const reqBody = req.body;
        const result = await this.prisma.test.create({
            data: {
                name: reqBody.name,
                favoriteNumber: reqBody.favoriteNumber,
            }
        })
        res.json(result);
    }

    public static getAll = async (req: express.Request, res: express.Response) => {
        const response = await this.prisma.test.findMany();
        res.json(response);
    }

    public static getById = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const id = Number.parseInt(request.params.id);

        this.prisma.test.findUnique({
            where: {
                id: id,
            },
        })
        .then ((test) => {
            if (!test) {
                next(new TestNotFoundException(id));
            } else {
                response.json(test);
            }
        })
    }; 

    public static delete = async (req: express.Request, res: express.Response) => {
        const id = Number.parseInt(req.params.id);
        const test = await this.prisma.test.delete({
            where: {
                id: id,
            },
        }).then ((test) => {
            res.json(test);
        }).catch ((error) => {
            console.log(error);
            res.json(error.meta.cause);
        })
    }
}