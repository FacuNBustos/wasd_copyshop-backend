import { Request, Response } from "express";
import CommandError from "../../helpers/command.error";
import InternalServerError from "../../helpers/internalServer.error";
import CreateUserCommand from "../../../../application/commands/users/create.user.command";
import createUserHandler from "../../../../application/handlers/users/create.user.handler";

export default new class CreateUserAction {
    async run(req: Request, res: Response) {
        try {
            const command = new CreateUserCommand(
                req.body.email,
                req.body.password,
                req.body.role,
                req.body.firstName,
                req.body.lastName
            );
            await createUserHandler.execute(command);

            return res.status(201).json({ message: "User has been created" });
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({message: message});
            };
            return res.status(InternalServerError.statusCode).json({ message: InternalServerError.message, error: exception.message });
        }
    }
}