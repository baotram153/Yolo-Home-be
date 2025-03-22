import { BaseModel } from './base.model';
import { TestNotFoundException } from '../exceptions/not-found-exception';

export interface Test {
    name: string;
    favoriteNumber: number;
}

export class TestModel extends BaseModel {
    public static async getAll() {
        try {
            const result = await TestModel.prisma.test.findMany()
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        
    }

    public static async create(test: Test) {
        try {
            const result = await TestModel.prisma.test.create({
                data: {
                    name: test.name,
                    favoriteNumber: test.favoriteNumber,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async getById(id: number) {
        try {
            const result = await TestModel.prisma.test.findUnique({
                where: {
                    id: id,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async delete(id: number) {
        try {
            const result = await TestModel.prisma.test.delete({
                where: {
                    id: id,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async update(id: number, name: string | null = null, favoriteNumber: number | null = null) {
        let updateData = {}
        if (name) { updateData = { ...updateData, name: name } }
        if (favoriteNumber) { updateData = { ...updateData, favoriteNumber: favoriteNumber } }
        try {
            const result = TestModel.prisma.test.update({
                where: {
                    id: id,
                },
                data: updateData
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }
}