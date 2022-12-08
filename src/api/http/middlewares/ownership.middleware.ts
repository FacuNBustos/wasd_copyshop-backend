import { Request, Response } from "express";
import jwtService from "../../../infraestructure/services/jwt.service";
import ErrorObject from "../helpers/Error.object";

export default new class OwnershipMiddleware {
    async run(req: Request, res: Response, next: Function) {
        try {
            if (!req.headers.authorization) throw new ErrorObject("Missing token", 403);
            await jwtService.verify(req.headers.authorization);

            next();
        } catch(exception: any) {
            const status = exception.statusCode || 500;
            return res.status(status).json({ message: exception.message })
        }
    }
}