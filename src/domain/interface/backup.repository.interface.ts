import BackupRepository from "../../infraestructure/repositories/mysql/Backup.repository";
import { Backup } from "../entities/Backup.entity";

export default new class BackupLocationInterface {
    async create(backup: Backup): Promise<void> { return await BackupRepository.create(backup) } 
}