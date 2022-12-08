import ErrorObject from "../../../api/http/helpers/Error.object";
import { Print } from "../../../domain/entities/Print.entity";
import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import printRepositoryInterface from "../../../domain/interface/print.repository.interface";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import CreatePrintCommand from "../../commands/prints/create.print.command";

export default new class CreatePrintHandler {
    async execute(command: CreatePrintCommand) {
        const userSaved = await userRepositoryInterface.findOneByPk(command.getUser());
        if (!userSaved) throw new ErrorObject("User not found", 400);

        const locationSaved = await locationRepositoryInterface.findOneByPk(command.getLocation());
        if (!locationSaved) throw new ErrorObject("Location not found", 400);

        const print = Print.create(
            command.getUser(),
            command.getLocation(),
            command.getFullName(),
            command.getDescription(),
            command.getAdvanceMoney(),
            command.getTotalMoney(),
            command.getCellNumber()
        );

        await printRepositoryInterface.create(print);
    }
}