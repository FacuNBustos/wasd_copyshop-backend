import { DataTypes, Model, Sequelize } from "sequelize"

export default class BackupModel {
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
            createAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            totalMoney: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            cellNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            modelName: "Backup",
            tableName: "backups",
            sequelize: this.sequelize,
            timestamps: false
        })
        return model;
    }
}