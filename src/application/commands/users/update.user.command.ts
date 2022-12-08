import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";
import { ROLES } from "../../../domain/enums/roles.enum";
import { Nulleable } from "../../../domain/valueObjects/Nulleable";

export default class UpdateUserCommand {
    private readonly id: string;
    private readonly email: Nulleable<string>;
    private readonly password: Nulleable<string>;
    private readonly role: Nulleable<string>;
    private readonly firstName: Nulleable<string>;
    private readonly lastName: Nulleable<string>;

    constructor(
        id: string,
        email: Nulleable<string>,
        password: Nulleable<string>,
        role: Nulleable<string>,
        firstName: Nulleable<string>,
        lastName: Nulleable<string>
    ) {
        const validObject = Joi.object({
            id: Joi.string().uuid().required(),
            email: Joi.string().email().allow(null).required(),
            password: Joi.string().min(5).max(50).allow(null).required(),
            role: Joi.string().valid(ROLES.admin, ROLES.user).allow(null).required(),
            firstName: Joi.string().min(3).max(50).allow(null).required(),
            lastName: Joi.string().min(3).max(50).allow(null).required()
        });

        const { error, value }= validObject.validate({
            id: id,
            email: email,
            password: password,
            role: role,
            firstName: firstName,
            lastName: lastName
        });
        if (error) throw new CommandError(error.message);

        this.id = value.id;
        this.email = value.email;
        this.password = value.password;
        this.role = value.role;
        this.firstName = value.firstName;
        this.lastName = value.lastName;
    };

    getId(): string {
        return this.id
    };

    getEmail(): Nulleable<string> {
        return this.email
    };

    getPassword(): Nulleable<string> {
        return this.password
    };

    getRole(): Nulleable<string> {
        return this.role
    };

    getFirstName(): Nulleable<string> {
        return this.firstName
    };

    getLastName(): Nulleable<string> {
        return this.lastName
    };
}