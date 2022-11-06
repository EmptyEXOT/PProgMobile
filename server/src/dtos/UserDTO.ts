const {Schema} = require('mongoose')

class UserDTO {
    private email: string;
    private id: string;
    private isActivated: boolean;

    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}