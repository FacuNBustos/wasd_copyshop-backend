import { DataTypes, Model, Sequelize } from "sequelize";

export default class LocationModel {
    private readonly sequelize: Sequelize;

    constructor(
        sequelize: Sequelize
    ) {
        this.sequelize = sequelize
    };

    getModel() {
        class model extends Model {};

        model.init({
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            deletedAt: DataTypes.DATE
        }, {
            modelName: "Location",
            tableName: "locations",
            sequelize: this.sequelize,
            timestamps: true,
            paranoid: true
        })
        return model;
    }
};