import Location from "../entities/Location.entity";
import locationRepository from "../../infraestructure/repositories/mysql/Location.repository";

export default new class LocationRepositoryInterface {
    async create(location: Location): Promise<void> { return await locationRepository.create(location) };
    async findAll(): Promise<Location[] | null> { return await locationRepository.findAll() };
    async findOneByPk(id: string): Promise<Location | null> { return await locationRepository.findOneByPK(id) };
    async findOneByPattern(pattern: any): Promise<Location | null> { return await locationRepository.findOneByPattern(pattern) };
    async deleteByPk(id: string): Promise<void> { return await locationRepository.deleteByPk(id) };
    async updateByPk(id: string, updates: any): Promise<void> { return await locationRepository.updateByPk(id, updates) };
}