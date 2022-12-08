import PrintRepository from "../../infraestructure/repositories/mysql/Print.repository";
import { Print } from "../entities/Print.entity";

export default new class PrintRepositoryInterface {
    async create(print: Print): Promise<void> { return await PrintRepository.create(print) };
    async findAll(criteria: any): Promise<Print[] | null> { return await PrintRepository.findAll(criteria) };
    async findOneByPk(id: string): Promise<Print | null> { return await PrintRepository.findOneByPk(id) };
    async findOneByPattern(pattern: string): Promise<Print | null> { return await PrintRepository.findOneByPattern(pattern) };
    async deleteByPk(id: string): Promise<void> { return await PrintRepository.deleteByPk(id) };
    async updateByPk(id: string, updates: any): Promise<void> { return await PrintRepository.updateByPk(id, updates) };
}