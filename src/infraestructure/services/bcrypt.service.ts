import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ErrorObject from "../../api/http/helpers/Error.object";
import { Nulleable } from "../../domain/valueObjects/Nulleable";

dotenv.config();

export default new class BcryptService {
    private readonly saltRound: number;

    constructor() {
        this.saltRound = 10
    };

    async compare(password: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(password, hashed);
    };

    private async genSalt(): Promise<string> {
        return await bcrypt.genSalt(this.saltRound);
    };

    async hash(password: string): Promise<string> {
        const salt = await this.genSalt();

        const result = bcrypt.hashSync(password, salt);
        return result;
    };

}