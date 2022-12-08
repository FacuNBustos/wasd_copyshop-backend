import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";
import { ROLES } from "../../../domain/enums/roles.enum";
import { Nulleable } from "../../../domain/valueObjects/Nulleable";

export default class CreateUserCommand {
    private readonly email: string;
    private readonly password: string;
    private readonly role: string;
    private readonly firstName: Nulleable<string>;
    private readonly lastName: Nulleable<string>;

    constructor(
        email: string,
        password: string,
        role: string,
        firstName: Nulleable<string>,
        lastName: Nulleable<string>
    ) {
        const validObject = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(50).required(),
            role: Joi.string().valid(ROLES.admin, ROLES.user).required(),
            firstName: Joi.string().allow(null).min(3).max(50).required(),
            lastName: Joi.string().allow(null).min(3).max(50).required()
        });

        const { error, value } = validObject.validate({
            email: email,
            password: password,
            role: role,
            firstName: firstName,
            lastName: lastName
        });
        if (error) throw new CommandError(error.message);

        this.email = value.email;
        this.password = value.password;
        this.role = value.role;
        this.firstName = value.firstName;
        this.lastName = value.lastName;
    };

    getEmail(): string {
        return this.email
    };

    getPassword(): string {
        return this.password
    };

    getRole(): string {
        return this.role
    };

    getFirstName(): Nulleable<string> {
        return this.firstName
    };

    getLastName(): Nulleable<string> {
        return this.lastName
    };
}