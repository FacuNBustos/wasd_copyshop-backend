import { Request, Response } from "express";
import ValidateUserCommand from "../../../../application/commands/users/validate.user.command";
import validateUserHandler from "../../../../application/handlers/users/validate.user.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class ValidateUserAction {
    async run(req: Request, res: Response) {
        try {
            const command = new ValidateUserCommand(
                req.headers.authorization
            );

            const response = await validateUserHandler.execute(command);

            return res.status(200).json({ message: "Access granted", payload: response });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}