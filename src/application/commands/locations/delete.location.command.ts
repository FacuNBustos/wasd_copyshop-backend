import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";

export default class DeleteLocationCommand {
    private readonly id: string;

    constructor(
        id: string
    ) {
        const validObject = Joi.object({
            id: Joi.string().uuid().required()
        });

        const { error, value } = validObject.validate({
            id: id
        });
        if (error) throw new CommandError(error.message);

        this.id = value.id;
    };

    getId(): string {
        return this.id
    };
}