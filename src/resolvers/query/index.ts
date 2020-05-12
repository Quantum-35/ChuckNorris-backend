const fetch = require('node-fetch');


const Query = {
    async users(parent, args, { url, req }, info) {
        return [{name: "hellow"}]
    
    },
    async jokes(parent, args, { url, req }, info) {
        return fetch(`${url}/random`)
            .then(res => res.json())
            .then(body => {
                return body;
            });
    }
}

export default Query;