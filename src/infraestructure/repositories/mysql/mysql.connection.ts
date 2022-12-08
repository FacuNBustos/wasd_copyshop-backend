import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const mysqlConnection = new Sequelize('wasd_copyshop', DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT
});

export default mysqlConnection;