import jwtService from "../../../infraestructure/services/jwt.service";
import ValidateUserCommand from "../../commands/users/validate.user.command";

export default new class ValidateUserHandler {
    async execute(command: ValidateUserCommand) {
        await jwtService.verify(command.getToken());
        const payload:any = await jwtService.decode(command.getToken());
        return {
            id: payload.id,
            role: payload.role
        };
    }
}