import { Request, Response } from "express";
import PutStatusPrintCommand from "../../../../application/commands/prints/putStatus.print.command";
import putStatusPrintHandler from "../../../../application/handlers/prints/putStatus.print.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class PutStatusPrintAction {
    async run(req: Request, res: Response) {
        try {
            const command = new PutStatusPrintCommand(
                req.params.id,
                req.body.status
            );

            await putStatusPrintHandler.execute(command);

            return res.status(200).json({ message: "Print has been changed status" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}