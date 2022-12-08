import ErrorObject from "../../../api/http/helpers/Error.object";
import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import UpdateLocationCommand from "../../commands/locations/update.location.command";

export default new class UpdateLocationHandler {
    async execute(command: UpdateLocationCommand) {
        const locationSaved = await locationRepositoryInterface.findOneByPk(command.getId());
        if (!locationSaved) throw new ErrorObject("Location not found", 400);

        await locationRepositoryInterface.updateByPk(locationSaved.getId(), { name: command.getName().toUpperCase() });
    }
}