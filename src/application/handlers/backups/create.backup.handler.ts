import { Backup } from "../../../domain/entities/Backup.entity";
import backupRepositoryInterface from "../../../domain/interface/backup.repository.interface";

export default new class CreateBackupCommand {
    async execute(backup: Backup) {
        await backupRepositoryInterface.create(backup);
    }
}