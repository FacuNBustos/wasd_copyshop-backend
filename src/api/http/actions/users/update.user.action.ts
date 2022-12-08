import { Request, Response } from "express";
import UpdateUserCommand from "../../../../application/commands/users/update.user.command";
import updateUserHandler from "../../../../application/handlers/users/update.user.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class UpdateUserAction {
    async run(req: Request, res: Response) {
        try {
            const command = new UpdateUserCommand(
                req.params.id,
                req.body.email,
                req.body.password,
                req.body.role,
                req.body.firstName,
                req.body.lastName
            );

            await updateUserHandler.execute(command);

            return res.status(200).json({ message: "User has been updated" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message, error: exception.message });
        }
    }
}