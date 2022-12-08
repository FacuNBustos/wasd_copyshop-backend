import { Application } from "express";
import CommonRoutes from "./Common.routes";
import createUserAction from "../actions/users/create.user.action";
import administratorMiddleware from "../middlewares/administrator.middleware";
import deleteUserAction from "../actions/users/delete.user.action";
import loginUserAction from "../actions/users/login.user.action";
import listUserAction from "../actions/users/list.user.action";
import updateUserAction from "../actions/users/update.user.action";
import validateUserAction from "../actions/users/validate.user.action";

export default class UserRoutes extends CommonRoutes {
    constructor(
        app: Application
    ) {
        super(app, "User")
    };

    setUpRoutes(): Application {

        this.app.get("/users", administratorMiddleware.run, listUserAction.run);
        
        this.app.post('/auth/login', loginUserAction.run);

        this.app.post("/auth/token", validateUserAction.run);

        this.app.post('/auth/register', administratorMiddleware.run, createUserAction.run);

        this.app.put("/users/:id",administratorMiddleware.run, updateUserAction.run);

        this.app.delete("/users/:id",administratorMiddleware.run, deleteUserAction.run);

        return this.app;
    }
}