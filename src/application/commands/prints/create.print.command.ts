import joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";
import { Nulleable } from "../../../domain/valueObjects/Nulleable";

export default class CreatePrintCommand {
    private readonly user: string;
    private readonly location: string;
    private readonly fullName: string;
    private readonly description: string;
    private readonly advanceMoney: Nulleable<number>;
    private readonly totalMoney: Nulleable<number>
    private readonly cellNumber: Nulleable<string>;

    constructor(
        user: string,
        location: string,
        fullName: string,
        description: string,
        advanceMoney: Nulleable<number>,
        totalMoney: Nulleable<number>,
        cellNumber: Nulleable<string>
    ) {
        const validObject = joi.object({
            user: joi.string().uuid().required(),
            location: joi.string().uuid().required(),
            fullName: joi.string().min(5).max(50).required(),
            description: joi.string().min(5).max(150).required(),
            advanceMoney: joi.number().min(0).allow(null).required(),
            totalMoney: joi.number().min(0).allow(null).required(),
            cellNumber: joi.string().min(6).max(30).allow(null).required()
        });

        const { error, value } = validObject.validate({
            user: user,
            location: location,
            fullName: fullName,
            description: description,
            advanceMoney: advanceMoney,
            totalMoney: totalMoney,
            cellNumber: cellNumber
        });
        if (error) throw new CommandError(error.message);

        this.user = value.user;
        this.location = value.location;
        this.fullName = value.fullName.toUpperCase();
        this.description = value.description.toUpperCase();
        this.advanceMoney = value.advanceMoney;
        this.totalMoney = value.totalMoney;
        this.cellNumber = value.cellNumber;
    };
    
    getUser(): string {
        return this.user
    };

    getLocation(): string {
        return this.location
    };

    getFullName(): string {
        return this.fullName
    };

    getDescription(): string {
        return this.description
    };

    getAdvanceMoney(): Nulleable<number> {
        return this.advanceMoney
    };

    getTotalMoney(): Nulleable<number> {
        return this.totalMoney
    };

    getCellNumber(): Nulleable<string> {
        return this.cellNumber
    };
}