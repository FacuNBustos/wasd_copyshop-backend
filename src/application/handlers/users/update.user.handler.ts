import ErrorObject from "../../../api/http/helpers/Error.object";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import bcryptService from "../../../infraestructure/services/bcrypt.service";
import UpdateUserCommand from "../../commands/users/update.user.command";

export default new class UpdateUserHandler {
    async execute(command: UpdateUserCommand) {
        const userSaved = await userRepositoryInterface.findOneByPk(command.getId());
        if (!userSaved) throw new ErrorObject("User not found", 400);

        const updates = {
            email: (command.getEmail() && command.getEmail() !== userSaved.getEmail())? command.getEmail() : undefined,
            password: (command.getPassword())? command.getPassword() : undefined,
            role: (command.getRole() && command.getRole() !== userSaved.getRole())? command.getRole() : undefined,
            firstName: (command.getFirstName() && command.getFirstName() !== userSaved.getFisrtName())? command.getFirstName() : undefined,
            lastName: (command.getLastName() && command.getLastName() !== userSaved.getLastName())? command.getLastName() : undefined,
        };

        if (updates.email != undefined) {
            const findedUser = await userRepositoryInterface.findOneByPattern({ email: command.getEmail() });
            if (findedUser) throw new ErrorObject("Email already used", 400);
        };
        if (updates.password != undefined) {
            const validPassword = await bcryptService.compare(updates.password, userSaved.getPassword());
            (validPassword)? updates.password = undefined : updates.password = await bcryptService.hash(updates.password);
        };

        await userRepositoryInterface.updateByPk(userSaved.getId(), updates);
    }
}