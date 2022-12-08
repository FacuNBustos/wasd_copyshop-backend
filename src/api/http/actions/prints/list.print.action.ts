import { Request, Response } from "express";
import ListPrintCommand from "../../../../application/commands/prints/list.print.command";
import listPrintHandler from "../../../../application/handlers/prints/list.print.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class ListPrintAction {
    async run(req: Request, res: Response) {
        try {
            const command = new ListPrintCommand(
                req.query.page,
                req.query.order,
                req.query.location,
                req.query.internalCode,
                req.query.fullName,
                req.query.cellNumber,
                req.query.createAt,
                req.query.status
            );

            const printsSaved = await listPrintHandler.execute(command);

            return res.status(200).json({ prints: printsSaved });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}