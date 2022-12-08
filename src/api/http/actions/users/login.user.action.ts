import { Request, Response } from "express";
import LoginUserCommand from "../../../../application/commands/users/login.user.command";
import loginUserHandler from "../../../../application/handlers/users/login.user.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class LoginUserAction {
    async run(req: Request, res: Response) {
        try {

            const command = new LoginUserCommand(
                req.body.email,
                req.body.password
            );

            const token = await loginUserHandler.execute(command);
            
            return res.status(200).json(token);
        } catch(exception: any) {
            const { message, statusCode } = exception;
            if (message && statusCode) {
                return res.status(statusCode).json({ message: message })
            };
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}