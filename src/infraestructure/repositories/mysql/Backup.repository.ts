import { Backup } from "../../../domain/entities/Backup.entity";
import { Print } from "../../../domain/entities/Print.entity";
import BackupModel from "../../models/Backup.model";
import mysqlConnection from "./mysql.connection";

export default new class PrintRepository {
    private readonly model;

    constructor() {
        const model = new BackupModel(mysqlConnection);
        this.model = model.getModel();
    }

    async create(backup: Backup): Promise<void> {
        const build = this.model.build({
            id: backup.getId(),
            user: backup.getUser(),
            internalCode: backup.getInternalCode(),
            location: backup.getLocation(),
            fullName: backup.getFullName(),
            description: backup.getDescription(),
            createAt: backup.getCreateAt(),
            totalMoney: backup.getTotalMoney(),
            cellNumber: backup.getCellNumber(),
            status: backup.getStatus()
        });

        build.save();
    };

    async findAll(criteria: any): Promise<Print[] | null> {
        const printSaved = await this.model.findAll({
            where: criteria.filter,
            offset: (Number(criteria.page)*30)-30 || 0,
            limit: 30,
            order: [
                ["createAt", criteria.order || "DESC"]
            ]
        });

        if (printSaved.length > 0) {
            return printSaved.map((print) => {
                return Print.fromPrimitives(print)
            })
        };
        return null
    };

    async findOneByPk(id: string): Promise<Print | null> {
        const printSaved = await this.model.findByPk(id);

        return (printSaved)? Print.fromPrimitives(printSaved) : null;
    };

    async findOneByPattern(pattern: any): Promise<Print | null> {
        const printSaved = await this.model.findOne({
            where: {...pattern}
        });

        return (printSaved)? Print.fromPrimitives(printSaved) : null;
    };

    async deleteByPk(id:string): Promise<void> {
        await this.model.destroy({
            where: {
                id: id
            }
        })
    };
}