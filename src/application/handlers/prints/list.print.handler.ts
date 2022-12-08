import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import printRepositoryInterface from "../../../domain/interface/print.repository.interface"
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import ListPrintCommand from "../../commands/prints/list.print.command";

export default new class ListPrintHandler {
    async execute(command: ListPrintCommand) {
        let printsReturn: Array<any> = [];
        const criteria = command.getCriterias();

        let printsSaved = await printRepositoryInterface.findAll(criteria);

        if (printsSaved && printsSaved.length > 0) {
            for (let print of printsSaved) {
                const userSaved = await userRepositoryInterface.findOneByPk(print.getUser());
                const locationSaved = await locationRepositoryInterface.findOneByPk(print.getLocation());
                
                printsReturn.push({...print.toPrimitives(), user: { email: userSaved?.getEmail() }, location: locationSaved })
            }
        };
        
        return printsReturn;
    }
}