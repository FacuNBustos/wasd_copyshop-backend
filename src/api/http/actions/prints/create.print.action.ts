import { Request, Response } from "express";
import CreatePrintCommand from "../../../../application/commands/prints/create.print.command";
import createPrintHandler from "../../../../application/handlers/prints/create.print.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class CreatePrintAction {
    async run(req: Request, res: Response) {
        try {
            const command = new CreatePrintCommand(
                req.body.user,
                req.body.location,
                req.body.fullName,
                req.body.description,
                req.body.advanceMoney,
                req.body.totalMoney,
                req.body.cellNumber
            );

            await createPrintHandler.execute(command);

            return res.status(201).json({ message: "Print has been created" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}