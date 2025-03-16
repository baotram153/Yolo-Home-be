import express from 'express';
import { BaseController } from './abstractions/base-controller';
import { TestNotFoundException } from '../exceptions/not-found-exception';

export class TestController extends BaseController {
    public path = '/test';
    public path_with_id = '/test/:id';

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.path, this.getTest);
        this.router.post(this.path, this.postTest);
        this.router.get(this.path_with_id, this.getTestById);
    }

    public postTest = async (req: express.Request, res: express.Response) => {
        const reqBody = req.body;
        const test = await this.prisma.test.create({
            data: {
                name: reqBody.name,
                favoriteNumber: reqBody.favoriteNumber,
            }
        });
        res.json(test);
    }

    public getTest = async (req: express.Request, res: express.Response) => {
        const response = await this.prisma.test.findMany();
        res.json(response);
    }

    public getTestById = async (
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
            .then((hero) => {
                if (hero) {
                    response.json(hero);
                } else {
                    next(new TestNotFoundException(id));    // pass the request to the exception handler
                }
            });
    }; 
}