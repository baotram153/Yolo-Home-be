import { User } from '../models/users.model';
import { UserModel } from '../models/users.model';


export class UserService {
    public static async getAll() {
        const result = await UserModel.getAll();
        console.log(result);
        return result;
    }

    public static async getById(id: string) {
        const result = await UserModel.getById(id);
        return result;
    }

    public static async getByUserId(userId: string) {
        const result = await UserModel.getByUserId(userId);
        return result;
    }

    public static async create(user: User) {
        const result = await UserModel.create(user);
        return result;
    }

    public static async update(
        id: string, 
        username: string | null = null, 
        avatar_url: string | null = null,
        password: string | null = null
    ) {
        const result = await UserModel.update(id, username, avatar_url, password);
        return result;
    }

    public static async delete(id: string) {
        const result = await UserModel.delete(id);
        return result;
    }

    public static async getAllDevices(userId: string) {
        const result = await UserModel.getAllDevices(userId);
        return result;
    }
}
