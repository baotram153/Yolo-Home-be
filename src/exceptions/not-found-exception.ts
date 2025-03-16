import HttpException from "./http-exception";

export class TestNotFoundException extends HttpException {
    constructor(id: number) {
        super(404, `Test with id ${id} not found`);
    }
}