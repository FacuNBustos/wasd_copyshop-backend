import ErrorObject from "../../../api/http/helpers/Error.object";
import userRepositoryInterface from "../../../domain/interface/user.repository.interface";
import DeleteUserCommand from "../../commands/users/delete.user.command";

export default new class DeleteUserHandler {
    async execute(command: DeleteUserCommand) {
        const userSaved = await userRepositoryInterface.findOneByPk(command.getId());
        if (!userSaved) throw new ErrorObject("User not found", 400);

        await userRepositoryInterface.deleteByPk(userSaved.getId());
    }
}