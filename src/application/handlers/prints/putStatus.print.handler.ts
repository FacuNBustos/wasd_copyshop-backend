import ErrorObject from "../../../api/http/helpers/Error.object";
import { Backup } from "../../../domain/entities/Backup.entity";
import { PrintStatus } from "../../../domain/enums/printStatus.enum";
import printRepositoryInterface from "../../../domain/interface/print.repository.interface";
import PutStatusPrintCommand from "../../commands/prints/putStatus.print.command";
import createBackupHandler from "../backups/create.backup.handler";

export default new class PutStatusPrintHandler {
    async execute(command: PutStatusPrintCommand) {
        const printSaved = await printRepositoryInterface.findOneByPk(command.getId());
        if (!printSaved) throw new ErrorObject("Print not found", 400);

        printSaved.changeStatus(command.getStatus());

        if (printSaved.getStatus() == PrintStatus.INACTIVE || printSaved.getStatus() == PrintStatus.REJECT) {
            const backup = Backup.create(
                printSaved.getUser(),
                printSaved.getLocation(),
                printSaved.getInternalCode(),
                printSaved.getFullName(),
                printSaved.getDescription(),
                printSaved.getCreateAt(),
                printSaved.getTotalMoney(),
                printSaved.getCellNumber(),
                printSaved.getStatus()
            );
            await createBackupHandler.execute(backup);

            await printRepositoryInterface.deleteByPk(printSaved.getId());

            return;
        };

        await printRepositoryInterface.updateByPk(printSaved.getId(), { status: printSaved.getStatus() });
    }
}