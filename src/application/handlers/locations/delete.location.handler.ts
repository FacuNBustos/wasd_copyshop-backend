import ErrorObject from "../../../api/http/helpers/Error.object";
import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import DeleteLocationCommand from "../../commands/locations/delete.location.command";

export default new class DeleteLocationHandler {
    async execute(command: DeleteLocationCommand) {
        const locationSaved = await locationRepositoryInterface.findOneByPk(command.getId());
        if (!locationSaved) throw new ErrorObject("Location not found", 400);

        await locationRepositoryInterface.deleteByPk(locationSaved.getId());
    }
}