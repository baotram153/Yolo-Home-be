import HttpException from "./http-exception";

export class TestNotFoundException extends HttpException {
    constructor(id: number) {
        super(404, `Test with id ${id} not found`);
    }
}

export class DeviceNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Device with id ${id} not found`);
    }
}

export class UserNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `User with id ${id} not found`);
    }
}
