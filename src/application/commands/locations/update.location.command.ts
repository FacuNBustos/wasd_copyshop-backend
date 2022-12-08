import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";

export default class UpdateLocationCommand {
    private readonly id: string;
    private readonly name: string;

    constructor(
        id: string,
        name: string
    ) {
        const validObject = Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().min(3).max(50).required()
        });

        const { error, value } = validObject.validate({
            id: id, 
            name: name
        });
        if (error) throw new CommandError(error.message);

        this.id = value.id;
        this.name = value.name
    };

    getId(): string {
        return this.id
    };

    getName(): string {
        return this.name
    };
}