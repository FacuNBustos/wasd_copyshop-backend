import locationRepositoryInterface from "../../../domain/interface/location.repository.interface"

export default new class ListLocationHandler {
    async execute() {
        const locationsSaved = await locationRepositoryInterface.findAll();

        return locationsSaved;
    }
}