import { v4 } from "uuid";
import { Nulleable } from "../valueObjects/Nulleable";
import { PrintStatus } from "../enums/printStatus.enum";
import ErrorObject from "../../api/http/helpers/Error.object";

export class Print {
    private id: string;
    private user: string;
    private internalCode: string;
    private location: string;
    private fullName: string;
    private description: string;
    private status: string;
    private createAt: Date;
    private advanceMoney: Nulleable<number>;
    private totalMoney: Nulleable<number>;
    private cellNumber: Nulleable<string>;

    constructor(
        id: string,
        user: string,
        internalCode: string,
        location: string,
        fullName: string,
        description: string,
        status: string,
        createAt: Date,
    ) {
        this.id = id;
        this.user = user;
        this.internalCode = internalCode;
        this.location = location;
        this.fullName = fullName;
        this.description = description;
        this.status = status;
        this.createAt = createAt;
        this.advanceMoney = null;
        this.totalMoney = null;
        this.cellNumber = null;
    };

    public static create(
        user: string,
        location: string,
        fullName: string,
        description: string,
        advanceMoney: Nulleable<number>,
        totalMoney: Nulleable<number>,
        cellNumber: Nulleable<string>
    ): Print 
    {
        const id = v4();
        const internalCode = `A${Math.floor((Math.random() * (10000 - 1000 + 1)) + 1000)}`;
        const status = PrintStatus.ACTIVE;
        const createAt = new Date(Date.now());

        const print = new Print(
            id,
            user,
            internalCode,
            location,
            fullName,
            description,
            status,
            createAt
        );
        print.advanceMoney = advanceMoney;
        print.totalMoney = totalMoney;
        print.cellNumber = cellNumber;
        
        return print;
    };

    static fromPrimitives(primitives: any): Print {
        const print = new Print(
            primitives.id,
            primitives.user,
            primitives.internalCode,
            primitives.location,
            primitives.fullName,
            primitives.description,
            primitives.status,
            primitives.createAt
        );
        
        print.advanceMoney = primitives.advanceMoney;
        print.totalMoney = primitives.totalMoney;
        print.cellNumber = primitives.cellNumber;

        return print;
    };

    changeStatus(status: string) {
        switch(status) {
            case PrintStatus.REJECT:
                if (this.status == status || this.status == PrintStatus.INACTIVE) {
                    throw new ErrorObject(`The print is ${this.status} status`, 400);
                };
                this.status = PrintStatus.REJECT;
                break;
            case PrintStatus.INACTIVE:
                if (this.status == status || this.status == PrintStatus.REJECT) {
                    throw new ErrorObject(`The print is ${this.status} status`, 400);
                }
                this.status = status;
                break;
            case PrintStatus.PROGRESS:
                if (this.status == status) {
                    throw new ErrorObject(`The print is ${this.status} status`, 400);
                }
                else if (this.status == PrintStatus.REJECT || this.status == PrintStatus.INACTIVE) {
                    throw new ErrorObject(`The print is ${this.status} status`, 400);
                };
                this.status = status;
                break;
            case PrintStatus.ACTIVE:
                throw new ErrorObject("Invalid print status", 400);
            default:
                throw new ErrorObject("Sintax error of status code", 400);
        }
    };

    getId(): string {
        return this.id
    };

    getUser(): string {
        return this.user
    };

    getInternalCode(): string {
        return this.internalCode
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

    getStatus(): string {
        return this.status
    };

    getCreateAt(): Date {
        return this.createAt
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

    toPrimitives(): any {
        return {
            id: this.id,
            user: this.user,
            internalCode: this.internalCode,
            location: this.location,
            fullName: this.fullName,
            description: this.description,
            status: this.status,
            createAt: this.createAt,
            advanceMoney: this.advanceMoney,
            totalMoney: this.totalMoney,
            cellNumber: this.cellNumber
        }
    };
}