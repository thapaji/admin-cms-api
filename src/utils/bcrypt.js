import bcryptjs from 'bcryptjs'

const saltRound = 15;

export const hashPassword = (plainPassword) => {
    return bcryptjs.hashSync(plainPassword, saltRound);
}

export const comparePassword = (plainPassword, hashPassword) => {
    return bcryptjs.compareSync(plainPassword, hashPassword);
}