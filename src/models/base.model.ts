import { PrismaClient } from '@prisma/client';


export class BaseModel {
    public static prisma = new PrismaClient();
}