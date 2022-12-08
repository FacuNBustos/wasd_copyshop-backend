import userRepositoryInterface from "../../../domain/interface/user.repository.interface"

export default new class ListUserHandler {
    async execute() {
        const usersSaved = await userRepositoryInterface.findAll();

        return (usersSaved)? usersSaved.map((user) => {
            return {...user.toPrimitives(), password: undefined}
        }) : null;
    }
}