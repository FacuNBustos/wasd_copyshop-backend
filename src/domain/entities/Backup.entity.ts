import { v4 } from "uuid";
import { Nulleable } from "../valueObjects/Nulleable";

export class Backup {
    private id: string;
    private user: string;
    private internalCode: string;
    private location: string;
    private fullName: string;
    private description: string;
    private createAt: Date;
    private totalMoney: Nulleable<number>;
    private cellNumber: Nulleable<string>;
    private status: string;

    constructor(
        id: string,
        user: string,
        internalCode: string,
        location: string,
        fullName: string,
        description: string,
        createAt: Date,
        status: string,
    ) {
        this.id = id;
        this.user = user;
        this.internalCode = internalCode;
        this.location = location;
        this.fullName = fullName;
        this.description = description;
        this.createAt = createAt;
        this.totalMoney = null;
        this.cellNumber = null;
        this.status = status;
    };

    public static create(
        user: string,
        location: string,
        internalCode: string,
        fullName: string,
        description: string,
        createAt: Date,
        totalMoney: Nulleable<number>,
        cellNumber: Nulleable<string>,
        status: string
    ): Backup 
    {
        const id = v4();

        const print = new Backup(
            id,
            user,
            internalCode,
            location,
            fullName,
            description,
            createAt,
            status
        );
        print.totalMoney = totalMoney;
        print.cellNumber = cellNumber;
        
        return print;
    };

    static fromPrimitives(primitives: any): Backup {
        const print = new Backup(
            primitives.id,
            primitives.user,
            primitives.location,
            primitives.internalCode,
            primitives.fullName,
            primitives.description,
            primitives.createAt,
            primitives.status
        );
        
        print.totalMoney = primitives.totalMoney;
        print.cellNumber = primitives.cellNumber;

        return print;
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

    getCreateAt(): Date {
        return this.createAt
    };

    getTotalMoney(): Nulleable<number> {
        return this.totalMoney
    };

    getCellNumber(): Nulleable<string> {
        return this.cellNumber
    };

    getStatus(): string {
        return this.status
    };

    toPrimitives(): any {
        return {
            id: this.id,
            user: this.user,
            internalCode: this.internalCode,
            location: this.location,
            fullName: this.fullName,
            description: this.description,
            createAt: this.createAt,
            totalMoney: this.totalMoney,
            cellNumber: this.cellNumber
        }
    };
}