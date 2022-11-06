module.exports = class UserDTO {
    nickname;
    email;
    id;
    isActivated;

    constructor(model) {
        this.nickname = model.nickname;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}