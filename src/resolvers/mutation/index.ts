import bcrypt from 'bcrypt';

import {validateRequest} from '../../utils/validateBody';
import {generateToken} from '../../utils/validate';

const Mutation = {
    async createUser(_, args, { db }, info) {
        const { email, password } = args.data;
        const isValid= validateRequest('signup', { email, password});
        if(!isValid.success) {
            throw isValid.error;
        }
        const user = await db.collection('users').findOne({
            email
        });
        if(user) throw 'Email already exist. Try another one!'
        const encPassword = bcrypt.hashSync(password, 8)
        const { ops } = await db.collection('users').insert({ email, password: encPassword });
        console.log('@@', ops[0]);
        const token = generateToken(email);
        const results = {
            email: ops[0].email,
            token
        }
        return results;
    },
    async signIn(_, args, { db }, info) {
        const { email, password } = args.data;
        const user = await db.collection('users').findOne({
            email
        });
        if(!user) throw 'Invalid Email or Password. Try again!'
        const validatePassword = bcrypt.compareSync(password, user.password);
        if(!validatePassword) {
            throw 'Invalid Email or Password. Try again!';
        }
        const token = generateToken(email);
        const results = {
            email: user.email,
            token
        }
        return results;
    }
};

export default Mutation;
