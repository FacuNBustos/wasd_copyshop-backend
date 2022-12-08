import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorObject from "../../api/http/helpers/Error.object";
import InternalServerError from "../../api/http/helpers/internalServer.error";

export default new class JWTService {

    async sing(payload: any): Promise<string> {
        if (!process.env.JWT_PRIVATY_KEY) throw InternalServerError;

        const token = jwt.sign({
            ...payload
        }, process.env.JWT_PRIVATY_KEY, {expiresIn: "20h", algorithm: "HS256"});

        return token;
    };

    async verify(token: string): Promise<void> {
        if (!process.env.JWT_PRIVATY_KEY) throw InternalServerError;

        jwt.verify(token, process.env.JWT_PRIVATY_KEY, {algorithms: ["HS256"]}, (err) => {
            if (err) {
                throw new ErrorObject(err.message, 400);
            };
        });
    };

    async decode(token: string): Promise<string | JwtPayload> {
        if (!process.env.JWT_PRIVATY_KEY) throw InternalServerError;

        const payload = jwt.decode(token);

        if (payload !== null) {
            return payload
        };
        throw new ErrorObject("Payload token is null", 400);
    }
}