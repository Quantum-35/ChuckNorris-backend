import {validateRequest} from '../../utils/validateBody';

const Mutation = {
    async createUser(parent, args, { db }, info) {
        const { email, password } = args.data;
        const isValid= validateRequest('signup', { email, password});
        if(!isValid.success) {
            throw isValid.error;
        }
        const user = await db.collection('users').findOne({
            email
        });
        if(user) throw 'Email already exist. Try another one!'
        const { ops } = await db.collection('users').insert({ email, password });
        console.log('@@', ops[0]);
        return ops[0];
    },
};

export default Mutation;
