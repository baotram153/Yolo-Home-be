import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { App } from "./app";
// import { testRouter } from "./routes/tests.routers";
import { baseRouter } from "./routes/base.routers";
import { accessRouter } from "./routes/access.router";

dotenv.config();

const port = process.env.PORT || 3000;
const app = new App(port, [accessRouter], [baseRouter]);

