import { Request, Response } from "express";
import DeletePrintCommand from "../../../../application/commands/prints/delete.print.command";
import deletePrintHandler from "../../../../application/handlers/prints/delete.print.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class DeletePrintAction {
    async run(req: Request, res: Response) {
        try {
            const command = new DeletePrintCommand(
                req.params.id
            );

            await deletePrintHandler.execute(command);

            return res.status(200).json({ message: "Print has been deleted" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}