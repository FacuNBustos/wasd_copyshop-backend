import joi from "joi";
import CommandError from "../../../api/http/helpers/command.error";
import { Nulleable } from "../../../domain/valueObjects/Nulleable";

export default class UpdatePrintCommand {
    private readonly id: string;
    private readonly user: Nulleable<string>;
    private readonly location: Nulleable<string>;
    private readonly fullName: Nulleable<string>;
    private readonly description: Nulleable<string>;
    private readonly advanceMoney: Nulleable<number>;
    private readonly totalMoney: Nulleable<number>
    private readonly cellNumber: Nulleable<string>;

    constructor(
        id: string,
        user: Nulleable<string>,
        location: Nulleable<string>,
        fullName: Nulleable<string>,
        description: Nulleable<string>,
        advanceMoney: Nulleable<number>,
        totalMoney: Nulleable<number>,
        cellNumber: Nulleable<string>
    ) {
        const validObject = joi.object({
            id: joi.string().uuid().required(),
            user: joi.string().uuid().allow(null).required(),
            location: joi.string().uuid().allow(null).required(),
            fullName: joi.string().min(5).max(50).allow(null).required(),
            description: joi.string().min(5).max(150).allow(null).required(),
            advanceMoney: joi.number().min(0).allow(null).required(),
            totalMoney: joi.number().min(0).allow(null).required(),
            cellNumber: joi.string().min(6).max(30).allow(null).required()
        });

        const { error, value } = validObject.validate({
            id: id,
            user: user,
            location: location,
            fullName: fullName,
            description: description,
            advanceMoney: advanceMoney,
            totalMoney: totalMoney,
            cellNumber: cellNumber
        });
        if (error) throw new CommandError(error.message);

        this.id = value.id;
        this.user = value.user;
        this.location = value.location;
        this.fullName = value.fullName;
        this.description = value.description;
        this.advanceMoney = value.advanceMoney;
        this.totalMoney = value.totalMoney;
        this.cellNumber = value.cellNumber;
    };

    getId(): string {
        return this.id
    };
    
    getUser(): Nulleable<string> {
        return this.user
    };

    getLocation(): Nulleable<string> {
        return this.location
    };

    getFullName(): Nulleable<string> {
        return this.fullName
    };

    getDescription(): Nulleable<string> {
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