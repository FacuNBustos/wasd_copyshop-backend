import User from "../entities/User.entity";
import UserRepository from "../../infraestructure/repositories/mysql/User.repository";

export default new class UserRepositoryInterface {
    async create(user: User): Promise<void> { return await UserRepository.create(user) };
    async findAll(): Promise<User[] | null> { return await UserRepository.findAll() };
    async findOneByPattern(pattern: any): Promise<User | null> { return await UserRepository.findOneByPattern(pattern) };
    async findOneByPk(id: string): Promise<User | null> { return await UserRepository.findOneByPk(id) };
    async deleteByPk(id: string): Promise<void> { return await UserRepository.deleteByPk(id) };
    async updateByPk(id: string, updates: any): Promise<void> { return await UserRepository.updateByPk(id, updates) };
}