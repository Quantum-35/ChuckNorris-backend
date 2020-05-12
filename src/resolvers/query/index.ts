const fetch = require('node-fetch');


const Query = {
    async users(parent, args, { url, req }, info) {
        return [{name: "hellow"}]
    
    },
    async jokes(parent, args, { url, req }, info) {
        return fetch(`${url}/jokes/random`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    },
    async categoryJokes(parent, args, { url, req }, info) {
        const { category } = args;

        return fetch(`${url}/jokes/random?category=${category}`)
            .then(res => res.json())
            .then(body => {
                console.log('a', body)
                return body;
            });
    },
    async categories(parent, args, { url, req }, info) {
        const { category } = args;
        console.log('HERE')
        return fetch(`${url}/jokes/categories`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    }
}

export default Query;