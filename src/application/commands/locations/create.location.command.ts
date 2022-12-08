import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";

export default class CreateLocationCommand {
    private readonly name: string;

    constructor(
        name: string
    ) {
        const validObject = Joi.object({
            name: Joi.string().min(3).max(50).required()
        });

        const { error, value }= validObject.validate({
            name: name
        });
        if (error) throw new CommandError(error.message);

        this.name = value.name;
    };

    getName(): string {
        return this.name
    };
}