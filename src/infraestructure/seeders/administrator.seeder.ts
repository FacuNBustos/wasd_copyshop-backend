import dotenv from "dotenv";
import User from "../../domain/entities/User.entity";
import { ROLES } from "../../domain/enums/roles.enum";
import userRepositoryInterface from "../../domain/interface/user.repository.interface";
import bcryptService from "../services/bcrypt.service";
dotenv.config();

export default new class AdministratorSeeder {
    async generate(): Promise<void> {
        if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
            const user = User.create(
                process.env.ADMIN_EMAIL,
                await bcryptService.hash(process.env.ADMIN_PASSWORD),
                ROLES.admin,
                null,
                null
            );

            const userSaved = await userRepositoryInterface.findOneByPattern({ email: user.getEmail() });
            if (!userSaved) {
                await userRepositoryInterface.create(user);
            }
        }
    }
}