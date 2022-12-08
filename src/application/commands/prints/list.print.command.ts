import Joi from "joi";
import { Op } from "sequelize";
import CommandError from "../../../api/http/helpers/command.error";
import { PrintStatus } from "../../../domain/enums/printStatus.enum";
import { Undefinable } from "../../../domain/valueObjects/Undefinable";

export default class ListPrintCommand {
    private readonly page: Undefinable<number>;
    private readonly order: Undefinable<string>;
    private readonly location: Undefinable<string>;
    private readonly internalCode: Undefinable<string>;
    private readonly fullName: Undefinable<string>;
    private readonly cellNumber: Undefinable<string>;
    private readonly createAt: Undefinable<string>;
    private readonly status: Undefinable<string>;

    constructor(
        page: any,
        order: any,
        location: any, 
        internalCode: any,
        fullName: any,
        cellNumber: any,
        createAt: any,
        status: any
    ) {
        const validObject = Joi.object({
            page: Joi.number().min(0).allow(null).required(),
            order: Joi.string().valid("ASC", "DESC").allow(null).required(),
            location: Joi.string().uuid().allow(null).required(),
            internalCode: Joi.string().max(6).allow(null).required(),
            fullName: Joi.string().min(3).max(50).allow(null).required(),
            cellNumber: Joi.string().min(3).allow(null).required(),
            createAt: Joi.date().allow(null).required(),
            status: Joi.string().valid(PrintStatus.ACTIVE, PrintStatus.PROGRESS).allow(null).required()
        });
        const { error, value } = validObject.validate({
            page: (page)? page : null,
            order: (order)? order : null,
            location: (location)? location : null,
            internalCode: (internalCode)? internalCode : null,
            fullName: (fullName)? fullName : null,
            cellNumber: (cellNumber)? cellNumber : null,
            createAt: (createAt)? createAt : null,
            status: (status)? status :  null
        });
        if (error) throw new CommandError(error.message);

        this.page = (value.page) ? value.page : undefined;
        this.order = (value.order)? value.order : undefined;
        this.location = (value.location)? value.location : undefined;
        this.internalCode = (value.internalCode)? value.internalCode : undefined;
        this.fullName = (value.fullName)? value.fullName : undefined;
        this.cellNumber = (value.cellNumber)? value.cellNumber : undefined;
        this.createAt = (value.createAt)? value.createAt : undefined;
        this.status = (value.status)? value.status : undefined;
    };

    getCriterias(): any {
        let filter: {} = {};
        if (this.location) {
            Object.defineProperty(filter, "location", {
                value: this.location,
                writable: true,
                enumerable: true,
                configurable: true
            })
        };
        if (this.internalCode) {
            Object.defineProperty(filter, "internalCode", {
                value: this.internalCode,
                writable: true,
                enumerable: true,
                configurable: true
            })
        };
        if (this.fullName) {
            Object.defineProperty(filter, "fullName", {
                value: {
                    [Op.substring] : this.fullName
                },
                writable: true,
                enumerable: true,
                configurable: true
            });
        };
        if (this.status) {
            Object.defineProperty(filter, "status", {
                value: this.status,
                writable: true,
                enumerable: true,
                configurable: true
            });
        };
        if (this.cellNumber) {
            Object.defineProperty(filter, "cellNumber", {
                value: {
                    [Op.substring] : this.cellNumber
                },
                writable: true,
                enumerable: true,
                configurable: true
            });
        };
        if (this.createAt) {
            Object.defineProperty(filter, "createAt", {
                value: {
                    [Op.gte] : new Date(this.createAt),
                    [Op.lt] : new Date(new Date(this.createAt).getTime() + 24*60*60*1000)
                },
                writable: true,
                enumerable: true,
                configurable: true
            });
        };

        return {
            page: this.page,
            filter: filter,
            order: this.order
        }
    }
}