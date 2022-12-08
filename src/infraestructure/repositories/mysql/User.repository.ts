import UserModel from "../../models/User.model";
import User from "../../../domain/entities/User.entity";
import mysqlConnection from "./mysql.connection";

export default new class UserRepository {
    private readonly model;

    constructor() {
        const model = new UserModel(mysqlConnection);
        this.model = model.getModel();
    }

    async create(user: User): Promise<void> {
        const build = this.model.build({
            id: user.getId(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            firstName: user.getFisrtName(),
            lastName: user.getLastName()
        });

        await build.save();
    };

    async findAll(): Promise<User[] | null> {
        const usersSaved = await this.model.findAll();

        if (usersSaved.length > 0) {
            return usersSaved.map((user) => {
                return User.fromPrimitives(user)
            })
        };
        return null;
    };

    async findOneByPattern(pattern: any): Promise<User | null> {
        const userSaved = await this.model.findOne({
            where: {...pattern}
        });

        return (userSaved)? User.fromPrimitives(userSaved) : null;
    };

    async findOneByPk(id: string): Promise<User | null> {
        const userSaved = await this.model.findByPk(id);
        
        return (userSaved)? User.fromPrimitives(userSaved) : null;
    };

    async deleteByPk(id: string): Promise<void> {
        await this.model.destroy({
            where: {
                id: id
            }
        });
    };

    async updateByPk(id: string, updates: any): Promise<void> {
        await this.model.update(updates, {
            where: {
                id: id
            }
        });
    };
}