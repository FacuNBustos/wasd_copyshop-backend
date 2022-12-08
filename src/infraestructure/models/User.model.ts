import { DataTypes, Model, Sequelize } from "sequelize";

export default class UserModel {
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
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role:  {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            deletedAt: DataTypes.DATE
        }, {
            modelName: "User",
            tableName: "users",
            sequelize: this.sequelize,
            timestamps: true,
            paranoid: true
        })
        return model;
    }
}