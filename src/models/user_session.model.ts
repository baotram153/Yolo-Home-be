import { BaseModel } from "./base.model";


export class UserSessionModel extends BaseModel{
    public static async createSession(userId: string, refreshToken: string, expiresAt: Date) {
        try {
            const result = await this.prisma.userSession.create({
                data: {
                    user_id: userId,
                    token: refreshToken,
                    expires_at: expiresAt, 
                }
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async removeSession(refreshToken: string) {
        try {
            const result = await this.prisma.userSession.delete({
                where: {
                    token: refreshToken,    // refresh token must be specified unique
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }

    public static async getByToken(refreshToken: string) {
        try {
            const result = await this.prisma.userSession.findUnique({
                where: {
                    token: refreshToken,
                },
            })
            return result
        }
        catch (error) {
            console.log(error);
        }
    }   
}