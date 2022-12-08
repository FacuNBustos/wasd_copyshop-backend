import ErrorObject from "../../../api/http/helpers/Error.object";
import printRepositoryInterface from "../../../domain/interface/print.repository.interface";
import DeletePrintCommand from "../../commands/prints/delete.print.command";

export default new class DeletePrintHandler {
    async execute(command: DeletePrintCommand) {
        const printSaved = printRepositoryInterface.findOneByPk(command.getId());
        if (!printSaved) throw new ErrorObject("Print not found", 400);

        await printRepositoryInterface.deleteByPk(command.getId());
    }
}