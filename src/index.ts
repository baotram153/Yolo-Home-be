import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { App } from "./app";
import { TestController } from "./controllers/test-controller";

dotenv.config();

const port = process.env.PORT || 3000;
const app = new App(port, [new TestController()]);

