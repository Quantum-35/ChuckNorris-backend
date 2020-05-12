import { authenticate } from '../../utils/validate';

const fetch = require('node-fetch');

const Query = {
    async users(_, args, { url, db }, info) {
        const users = await db.collection('users').find().toArray();
        return users
    
    },
    async user(_, args, { url, db }, info) {
        const { email } = args;
        if(!email) throw new Error('Email required');
        const user = await db.collection('users').findOne({
            email
        });
        return user
    
    },
    async jokes(_, args, { url, req }, info) {
        const token: string = req.req.headers.authorization || '';
        const isAuthenticated = authenticate(token);
        if(!isAuthenticated) {
            throw new Error('Please login first');
        }
        return fetch(`${url}/jokes/random`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    },
    async categoryJokes(_, args, { url, req }, info) {
        const { category } = args;

        const token: string = req.req.headers.authorization || '';
        const isAuthenticated = authenticate(token);
        if(!isAuthenticated) {
            throw new Error('Please login first');
        }

        return fetch(`${url}/jokes/random?category=${category}`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    },
    async categories(_, args, { url, req }, info) {
        const token: string = req.req.headers.authorization || '';
        const isAuthenticated = authenticate(token);
        if(!isAuthenticated) {
            throw new Error('Please login first');
        }

        return fetch(`${url}/jokes/categories`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    }
}

export default Query;