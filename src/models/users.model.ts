import { BaseModel } from './base.model';

export interface User {
    username: string,
    avatar_url: string,
    password: string
}

export class UserModel extends BaseModel {
    public static async getAll() {
        try {
            const result = await this.prisma.user.findMany()
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getByUserId(userId: string) {
        try {
            const result = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            })
            console.log(result)
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getByUsername(username: string) {
        try {
            const result = await this.prisma.user.findUnique({
                where: {
                    username: username,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }


    public static async create(user: User) {
        try {
            const result = await this.prisma.user.create({
                data: {
                    username: user.username,
                    avatar_url: user.avatar_url,
                    password: user.password,
                }
            })
            return result
        } catch (error) {
            console.log(error);
        }
    }

    public static async getById(id: string) {
        try {
            const result = await this.prisma.user.findUnique({
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

    public static async delete(id: string) {
        try {
            const result = await this.prisma.user.delete({
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

    public static async update(
        userId: string,
        username: string | null = null, 
        avatar_url: string | null = null,
        password: string | null = null
    ) {
        let updateData = {}
        if (username) { updateData = { ...updateData, username: username } }
        if (avatar_url) { updateData = { ...updateData, avatar_url: avatar_url } }
        if (password) { updateData = { ...updateData, password: password } }
        try {
            const result = this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: updateData
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getAllDevices(userId: string) {
            try {
                const result = await this.prisma.device.findMany({
                    where: {
                        user_id: userId,
                    },
                })
                console.log(result)
                return result
            }
            catch (error) {
                console.log(error);
            }
        }
}