// create a standardized success reponse
import express from 'express';

export const successResponse = (
    res: express.Response, 
    message: string = "Request sucessful",
    data: any = {}, 
    meta: any = {},
    statusCode: number = 200) => {

  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta
  });

};

export const okResponse = (
    res: express.Response,
    message: string = "Request sucessful",
    data: any = {},
    statusCode: number = 200) => {

    return successResponse(res, message, data, {}, statusCode);
};