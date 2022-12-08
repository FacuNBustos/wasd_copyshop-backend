import ErrorObject from "../../../api/http/helpers/Error.object";
import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import printRepositoryInterface from "../../../domain/interface/print.repository.interface";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import UpdatePrintCommand from "../../commands/prints/update.print.command";

export default new class UpdatePrintHandler {
    async execute(command: UpdatePrintCommand) {
        const printSaved = await printRepositoryInterface.findOneByPk(command.getId());
        if (!printSaved) throw new ErrorObject("Print not found", 400);

        const updates = {
            user: (command.getUser() && printSaved.getUser() !== command.getUser())? command.getUser() : undefined,
            location: (command.getLocation() && printSaved.getLocation() !== command.getLocation())? command.getLocation() : undefined,
            fullName: (command.getFullName() && printSaved.getFullName() !== command.getFullName())? command.getFullName() : undefined,
            description: (command.getDescription() && printSaved.getDescription() !== command.getDescription())? command.getDescription() : undefined,
            advanceMoney: (command.getAdvanceMoney() && printSaved.getAdvanceMoney() !== command.getAdvanceMoney())? command.getAdvanceMoney() : undefined,
            totalMoney: (command.getTotalMoney() && printSaved.getTotalMoney() !== command.getTotalMoney())? command.getTotalMoney() : undefined,
            cellNumber: (command.getCellNumber() && printSaved.getCellNumber() !== command.getCellNumber())? command.getCellNumber() : undefined
        };

        if (updates.user != undefined) {
            const userSaved = await userRepositoryInterface.findOneByPk(updates.user);
            if (!userSaved) throw new ErrorObject("User not found", 400);
        };

        if (updates.location != undefined) {
            const locationSaved = await locationRepositoryInterface.findOneByPk(updates.location);
            if (!locationSaved) throw new ErrorObject("User not found", 400);
        };

        await printRepositoryInterface.updateByPk(printSaved.getId(), updates);
    }
}