export default new  class InternalServerError extends Error {
    public statusCode: number;

    constructor() {
        super("Internal Server Error");
        this.statusCode = 500;
    };
    
}