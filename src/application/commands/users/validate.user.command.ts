import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";

export default class ValidateUserCommand {
    private readonly token: string;

    constructor(
        token: any
    ) {
        const validObject = Joi.object({
            token: Joi.string().required()
        });
        const { error, value } = validObject.validate({
            token: token
        });
        if (error) throw new CommandError(error.message);

        this.token = value.token;
    };

    getToken(): string {
        return this.token
    };
}