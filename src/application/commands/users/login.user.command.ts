import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";

export default class LoginUserCommand {
    private readonly email: string
    private readonly password: string

    constructor(
        email: string,
        password: string
    ) {
        const validObject = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(50).required(),
        });

        const { error, value } = validObject.validate({
            email: email,
            password: password,
        });
        if (error) throw new CommandError(error.message);

        this.email = value.email;
        this.password = value.password;
    };

    getEmail(): string {
        return this.email
    };

    getPassword(): string {
        return this.password
    };
}