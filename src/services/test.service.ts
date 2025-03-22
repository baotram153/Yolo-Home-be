import { Test } from '../models/test.model';
import { TestModel } from '../models/test.model';


export class TestService {
    public static async getAll() {
        const result = await TestModel.getAll();
        console.log(result);
        return result;
    }

    public static async create(test: Test) {
        const result = await TestModel.create(test);
        return result;
    }

    public static async getById(id: number) {
        const result = await TestModel.getById(id);
        return result;
    }

    public static async update(
        id: number, 
        name: string | null = null, 
        favoriteNumber: number | null = null) 
    {
        const result = await TestModel.update(id, name, favoriteNumber);
        return result;
    }

    public static async delete(id: number) {
        const result = await TestModel.delete(id);
        return result;
    }
}
