import ErrorObject from "../../../api/http/helpers/Error.object";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import bcryptService from "../../../infraestructure/services/bcrypt.service";
import jwtService from "../../../infraestructure/services/jwt.service";
import LoginUserCommand from "../../commands/users/login.user.command";

export default new class LoginUserHandler {
    async execute(command: LoginUserCommand) {
        const userSaved = await userRepositoryInterface.findOneByPattern({ email: command.getEmail() });
        if (!userSaved) throw new ErrorObject("User not found", 400);

        const result = await bcryptService.compare(command.getPassword(), userSaved.getPassword());
        if (!result) {
            throw new ErrorObject("Password of user incorrect", 400)
        };        
        const token = await jwtService.sing({
            id: userSaved.getId(),
            role: userSaved.getRole(),
        });

        return {
            token: token,
            id: userSaved.getId(),
            role: userSaved.getRole()
        };
    }
}