import { Request, Response } from "express";
import listUserHandler from "../../../../application/handlers/users/list.user.handler";
import internalServerError from "../../helpers/internalServer.error";

export default new class ListUserAction {
    async run(_req: Request, res: Response) {
        try {
            const usersSaved = await listUserHandler.execute();

            return res.status(200).json({ users: usersSaved});
        } catch (exception) {
            return res.status(internalServerError.statusCode).json({ message: internalServerError.message });
        }
    }
}