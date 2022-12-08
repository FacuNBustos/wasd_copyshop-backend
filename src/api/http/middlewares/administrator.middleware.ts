import { Request, Response } from "express";
import { ROLES } from "../../../domain/enums/roles.enum";
import jwtService from "../../../infraestructure/services/jwt.service";
import ErrorObject from "../helpers/Error.object";

export default new class AdministratorMiddleware {
    async run(req: Request, res: Response, next: Function) {
        try {
            if (!req.headers.authorization) throw new ErrorObject("Missing token", 403);
            await jwtService.verify(req.headers.authorization);

            const payload = await jwtService.decode(req.headers.authorization);
            const { role } = payload as any;

            if (role !== ROLES.admin) {
                throw new ErrorObject("Administrator permissions are required", 401)
            };

            next();
        } catch(exception: any) {
            const status = exception.statusCode || 500;
            return res.status(status).json({ message: exception.message })
        }
    }
}