import ErrorObject from "../../../api/http/helpers/Error.object";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import User from "../../../domain/entities/User.entity";
import CreateUserCommand from "../../commands/users/create.user.command";
import bcryptService from "../../../infraestructure/services/bcrypt.service";


export default new class CreateUserHandler {    
    async execute(command: CreateUserCommand) {
        const savedUser = await userRepositoryInterface.findOneByPattern({ email: command.getEmail() });
        if (savedUser) throw new ErrorObject("User already register", 400);

        const hashedPassword = await bcryptService.hash(command.getPassword());

        const user = User.create(
            command.getEmail(),
            hashedPassword,
            command.getRole(),
            command.getFirstName(),
            command.getLastName()
        );

        await userRepositoryInterface.create(user);
    }
}