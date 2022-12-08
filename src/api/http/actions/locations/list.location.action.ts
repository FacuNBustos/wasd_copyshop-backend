import { Request, Response } from "express";
import listLocationHandler from "../../../../application/handlers/locations/list.location.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class ListLocationAction {
    async run(_req: Request, res: Response) {
        try {
            const locationsSaved = await listLocationHandler.execute();

            return res.status(200).json({ locations: locationsSaved });
        } catch(exception) {
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}