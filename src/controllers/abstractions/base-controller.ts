import * as express from "express";
import { PrismaClient } from "@prisma/client";

export abstract class BaseController {
  public router: express.Router;
  public prisma: PrismaClient;

  constructor() {
    this.router = express.Router();
    this.prisma = new PrismaClient();
  }
  public abstract initializeRoutes(): void;
}