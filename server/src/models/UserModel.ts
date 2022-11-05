const {User} = require('./Schemas/User');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email: string) => {
    return User.findOne(email);
}

const createNewUser = async (email:string, password:string) => {
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await new User({email, password: hashPassword});
    await user.save();
}

const checkUserPassword = (user:any, password: string) => {
    return bcrypt.compareSync(password, user.password);
}

export {
    getUserByEmail,
    createNewUser,
    checkUserPassword,
}

