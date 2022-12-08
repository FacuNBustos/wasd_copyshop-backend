import { v4 } from "uuid";

export default class Location {
    private id: string;
    private name: string;

    constructor(
        id: string,
        name: string
    ) {
        this.id = id;
        this.name = name
    };

    public static create(name: string): Location {
        const id = v4();
        const location = new Location(id, name);
        
        return location;
    };

    static fromPrimitives(primitives: any): Location {
        const location = new Location(
            primitives.id,
            primitives.name
        );

        return location;
    };

    getId(): string {
        return this.id
    };

    getName(): string {
        return this.name
    };

    toPrimitives(): any {
        return {
            id: this.id,
            name: this.name
        }
    }
}