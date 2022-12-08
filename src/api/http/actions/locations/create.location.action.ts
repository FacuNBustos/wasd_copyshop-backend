import { Request, Response } from "express";
import CreateLocationCommand from "../../../../application/commands/locations/create.location.command";
import createLocationHandler from "../../../../application/handlers/locations/create.location.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class CreateLocationAction {
    async run(req: Request, res: Response) {
        try {
            const command = new CreateLocationCommand(
                req.body.name
            );

            await createLocationHandler.execute(command);

            return res.status(200).json({ message: "Location has been created" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}