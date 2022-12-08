import { DataTypes, Model, Sequelize } from "sequelize"

export default class PrintModel {
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
            user: {
                type: DataTypes.STRING,
                allowNull: false
            },
            internalCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            advanceMoney: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            totalMoney: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cellNumber: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            modelName: "Print",
            tableName: "prints",
            sequelize: this.sequelize,
            timestamps: true
        })
        return model;
    }
}