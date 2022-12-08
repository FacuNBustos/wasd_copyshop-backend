import ErrorObject from "../../../api/http/helpers/Error.object";
import Location from "../../../domain/entities/Location.entity";
import locationRepositoryInterface from "../../../domain/interface/location.repository.interface";
import CreateLocationCommand from "../../commands/locations/create.location.command";

export default new class CreateLocationHandler {
    async execute(command: CreateLocationCommand) {
        const locationSaved = await locationRepositoryInterface.findOneByPattern({ name: command.getName() });
        if (locationSaved) throw new ErrorObject("Location already exist", 400);

        const location = Location.create(
            command.getName().toUpperCase()
        );

        await locationRepositoryInterface.create(location);
    }
}