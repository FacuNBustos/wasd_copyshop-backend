import Joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";
import { PrintStatus } from "../../../domain/enums/printStatus.enum";

export default class PutStatusPrintCommand {
    private readonly id: string;
    private readonly status: string;

    constructor(
        id: string,
        status: string
    ) {
        const validObject = Joi.object({
            id: Joi.string().uuid().required(),
            status: Joi.string().valid(
                PrintStatus.ACTIVE,
                PrintStatus.INACTIVE,
                PrintStatus.PROGRESS,
                PrintStatus.REJECT
            ).required()
        });

        const { error, value } = validObject.validate({
            id: id,
            status: status.toUpperCase()
        });
        if (error) throw new CommandError(error.message);

        this.id = value.id;
        this.status = value.status;
    };

    getId(): string {
        return this.id
    };

    getStatus(): string {
        return this.status
    };
}