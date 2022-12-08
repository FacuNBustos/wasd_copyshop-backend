import { Request, Response } from "express";
import UpdatePrintCommand from "../../../../application/commands/prints/update.print.command";
import updatePrintHandler from "../../../../application/handlers/prints/update.print.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class UpdatePrintAction {
    async run(req: Request, res: Response) {
        try {
            const command = new UpdatePrintCommand(
                req.params.id,
                req.body.user,
                req.body.location,
                req.body.fullName,
                req.body.description,
                req.body.advanceMoney,
                req.body.totalMoney,
                req.body.cellNumber
            );

            await updatePrintHandler.execute(command);

            return res.status(200).json({ message: "Print has been updated" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}