import { Request, Response } from "express";
import DeleteUserCommand from "../../../../application/commands/users/delete.user.command";
import deleteUserHandler from "../../../../application/handlers/users/delete.user.handler";
import CommandError from "../../helpers/command.error";
import internalServerError from "../../helpers/internalServer.error";

export default new class DeleteUserAction {
    async run(req: Request, res: Response) {
        try {
            const command = new DeleteUserCommand(
                req.params.id
            );

            await deleteUserHandler.execute(command);

            return res.status(200).json({ message: "User has been deleted" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}