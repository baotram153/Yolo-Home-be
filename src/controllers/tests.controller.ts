// import express from 'express';
// import { BaseController } from './abstractions/base.controller';
// import { TestNotFoundException } from '../exceptions/not-found-exception';
// import { TestService } from '../services/test.service';
// import { okResponse } from '../utils/successReponse';

// export class TestController extends BaseController {

//     public constructor() {
//         super();
//     }

//     public static create = async (req: express.Request, res: express.Response) => {
//         const test = req.body;
//         const result = await TestService.create(test);
//         okResponse(res, "Test created successfully", result);
//     }

//     public static getAll = async (req: express.Request, res: express.Response) => {
//         const result = await TestService.getAll();
//         console.log(result);
//         okResponse(res, "Get all tests successfully", result);
//     }

//     public static getById = async (
//         req: express.Request,
//         res: express.Response,
//         next: express.NextFunction
//     ) => {
//         const id = Number.parseInt(req.params.id);
//         const result = await TestService.getById(id);
//         if (!result) {
//             next(new TestNotFoundException(id));
//         } else {
//             okResponse(res, `Test with id ${id} get successfully`, result);
//         }
//     }; 

//     public static update = async (req: express.Request, res: express.Response) => {
//         // if req.body.favoriteNumber is undefined, it will be null
//         const id = Number.parseInt(req.params.id);
//         const { name, favoriteNumber } = req.body;
//         const result = await TestService.update(id, name, favoriteNumber);
//         okResponse(res, "Test updated successfully", result);
//     }

//     public static delete = async (
//         req: express.Request, 
//         res: express.Response, 
//         next: express.NextFunction
//     ) => {
//         const id = Number.parseInt(req.params.id);
//         const result = await TestService.delete(id);
//         if (!result) {
//             next(new TestNotFoundException(id));
//         } else {
//             okResponse(res, "Test deleted successfully", result);
//         }
//     }
// }