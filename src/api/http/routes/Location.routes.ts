import { Application } from "express";
import createLocationAction from "../actions/locations/create.location.action";
import deleteLocationAction from "../actions/locations/delete.location.action";
import listLocationAction from "../actions/locations/list.location.action";
import updateLocationAction from "../actions/locations/update.location.action";
import ownershipMiddleware from "../middlewares/ownership.middleware";
import CommonRoutes from "./Common.routes";

export default class LocationRoutes extends CommonRoutes {
    constructor(
        app: Application
    ) {
        super(app, "Locations")
    };

    setUpRoutes(): Application {

        this.app.get("/locations", ownershipMiddleware.run, listLocationAction.run);

        this.app.post("/locations", ownershipMiddleware.run, createLocationAction.run);

        this.app.put("/locations/:id", ownershipMiddleware.run, updateLocationAction.run);

        this.app.delete("/locations/:id", ownershipMiddleware.run, deleteLocationAction.run);
        
        return this.app;
    };
}