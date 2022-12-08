import { Request, Response } from "express";
import UpdateLocationCommand from "../../../../application/commands/locations/update.location.command";
import updateLocationHandler from "../../../../application/handlers/locations/update.location.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class UpdateLocationAction {
    async run(req: Request, res: Response) {
        try {
            const command = new UpdateLocationCommand(
                req.params.id,
                req.body.name
            );

            await updateLocationHandler.execute(command);

            return res.status(200).json({ message: "Location has been updated" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}