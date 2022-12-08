import Location from "../../../domain/entities/Location.entity";
import LocationModel from "../../models/Location.model";
import mysqlConnection from "./mysql.connection";

export default new class LocationRepository {
    private readonly model;

    constructor() {
        const model = new LocationModel(mysqlConnection);
        this.model = model.getModel();
    }

    async create(location: Location): Promise<void> {
        const build = this.model.build({
            id: location.getId(),
            name: location.getName()
        });

        build.save();
    }

    async findAll(): Promise<Location[] | null> {
        const locationSaves = await this.model.findAll();

        if (locationSaves.length > 0) {
            return locationSaves.map((location) => {
                return Location.fromPrimitives(location)
            })
        };
        return null
    };

    async findOneByPK(id: string): Promise<Location | null> {
        const locationSaved = await this.model.findByPk(id);

        return (locationSaved)? Location.fromPrimitives(locationSaved) : null;
    };

    async findOneByPattern(pattern: any): Promise<Location | null> {
        const userSaved = await this.model.findOne({
            where: {...pattern}
        });

        return (userSaved)? Location.fromPrimitives(userSaved) : null;
    };

    async deleteByPk(id: string): Promise<void> {
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
    }
}