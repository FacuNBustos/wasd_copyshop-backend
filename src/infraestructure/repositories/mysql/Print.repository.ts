import { Print } from "../../../domain/entities/Print.entity";
import PrintModel from "../../models/Print.model";
import mysqlConnection from "./mysql.connection";

export default new class PrintRepository {
    private readonly model;

    constructor() {
        const model = new PrintModel(mysqlConnection);
        this.model = model.getModel();
    }

    async create(print: Print): Promise<void> {
        const build = this.model.build({
            id: print.getId(),
            user: print.getUser(),
            internalCode: print.getInternalCode(),
            location: print.getLocation(),
            fullName: print.getFullName(),
            description: print.getDescription(),
            status: print.getStatus(),
            createAt: print.getCreateAt(),
            advanceMoney: print.getAdvanceMoney(),
            totalMoney: print.getTotalMoney(),
            cellNumber: print.getCellNumber()
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

    async updateByPk(id: string, updates: any): Promise<void> {
        await this.model.update(updates, {
            where: {
                id: id
            }
        });
    };
}