import { authenticate } from '../../utils/validate';

const fetch = require('node-fetch');

const Query = {
    async users(parent, args, { url, req }, info) {
        return [{name: "hellow"}]
    
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