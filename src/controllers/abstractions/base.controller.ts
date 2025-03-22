import * as express from "express";
import { PrismaClient } from "@prisma/client";

export abstract class BaseController {
  public static prisma: PrismaClient = new PrismaClient();
  // public abstract initializeRoutes(): void;
}