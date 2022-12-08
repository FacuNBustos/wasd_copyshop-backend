import { Request, Response } from "express";
import DeleteLocationCommand from "../../../../application/commands/locations/delete.location.command";
import deleteLocationHandler from "../../../../application/handlers/locations/delete.location.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class DeleteLocationAction {
    async run(req: Request, res: Response) {
        try {
            const command = new DeleteLocationCommand(
                req.params.id
            );

            await deleteLocationHandler.execute(command);

            return res.status(200).json({ message: "Location has been deleted" });
        } catch(exception: any) { 
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}