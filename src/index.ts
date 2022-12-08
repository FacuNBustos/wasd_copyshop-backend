import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import { log } from 'debug';
import winston from 'winston';
import expressWinston from 'express-winston';
import CommonRoutes from './api/http/routes/Common.routes';
import UserRoutes from "./api/http/routes/User.routes";
import mysqlConnection from "./infraestructure/repositories/mysql/mysql.connection";
import LocationRoutes from "./api/http/routes/Location.routes";
import PrintRoutes from "./api/http/routes/Print.routes";
import administratorSeeder from "./infraestructure/seeders/administrator.seeder";

dotenv.config();

const app: express.Application = express();

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
};

app.use(expressWinston.logger(loggerOptions));
app.use(cors());
app.use(express.json());

const routes: Array<CommonRoutes> = [];
routes.push(new UserRoutes(app));
routes.push(new LocationRoutes(app));
routes.push(new PrintRoutes(app));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  routes.forEach((route: CommonRoutes) => {
    log(`Routes configured for ${route.getName()}`);
  });
  log('Server listening on port ' + PORT);
  mysqlConnection.sync().then(async () => {
    log("mysql database is ready");
    await administratorSeeder.generate()
  });
})