import { Application } from "express";
import createPrintAction from "../actions/prints/create.print.action";
import deletePrintAction from "../actions/prints/delete.print.action";
import listPrintAction from "../actions/prints/list.print.action";
import putStatusPrintAction from "../actions/prints/putStatus.print.action";
import updatePrintAction from "../actions/prints/update.print.action";
import ownershipMiddleware from "../middlewares/ownership.middleware";
import CommonRoutes from "./Common.routes";

export default class PrintRoutes extends CommonRoutes{
    constructor(
        app: Application
    ) {
        super(app, "Print")
    };

    setUpRoutes(): Application {
    
        this.app.get("/prints", ownershipMiddleware.run, listPrintAction.run);

        this.app.get("/prints/backup", ownershipMiddleware.run, () => {});

        this.app.post("/prints", ownershipMiddleware.run, createPrintAction.run);

        this.app.put("/prints/:id", ownershipMiddleware.run, updatePrintAction.run);

        this.app.put("/prints/status/:id", ownershipMiddleware.run, putStatusPrintAction.run);

        this.app.delete("/prints/:id", ownershipMiddleware.run, deletePrintAction.run);
        
        return this.app;
    }
}