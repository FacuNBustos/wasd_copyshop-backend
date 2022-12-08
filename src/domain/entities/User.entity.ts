import { v4 } from "uuid";
import { Nulleable } from "../valueObjects/Nulleable";

export default class User {
    private id: string;
    private email: string;
    private password: string;
    private role: string;
    private firstName: Nulleable<string>;
    private lastName: Nulleable<string>;

    constructor(
        id: string,
        email: string,
        password: string,
        role: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = null;
        this.lastName = null;
    };

    public static create(
        email: string, 
        password: string, 
        role: string, 
        firstName: Nulleable<string>, 
        lastName: Nulleable<string> )
        : User {
        const id = v4();
        const user = new User(id, email, password, role);
        user.firstName = firstName;
        user.lastName = lastName;

        return user;
    };

    static fromPrimitives(primitives: any): User {
        const user = new User(
            primitives.id,
            primitives.email,
            primitives.password,
            primitives.role
        );
        user.firstName = primitives.firstName;
        user.lastName = primitives.lastName;

        return user;
    };
    
    getId(): string {
        return this.id
    };

    getEmail(): string {
        return this.email
    };

    getPassword(): string {
        return this.password
    };

    getRole(): string {
        return this.role
    };

    getFisrtName(): Nulleable<string> {
        return this.firstName
    };

    getLastName(): Nulleable<string> {
        return this.lastName
    };

    toPrimitives(): any {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }
}