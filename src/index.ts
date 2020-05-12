import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import globalMiddleware from '../middleware/global';
import schema from './schema';
import { mongoConnect, getDb } from './utils/db';



dotenv.config();
const { PORT, BASE_URL, DB_URL, NODE_ENV } = process.env;

mongoConnect(()=> {
    const app = express();
    const port = PORT || 3002;
    const db = getDb();
    
    // middleware
    globalMiddleware(app);
    
    const server = new ApolloServer({
        schema,
        context: (request: any) => {
            return {
                req: request,
                url: BASE_URL,
                db
            }
        },
        playground: NODE_ENV !== 'production',
        validationRules: [depthLimit(7)]
    });
    
    server.applyMiddleware({ app, path: '/graphql' });
    
    app.listen({ port }, () => {
        const message = `Server is running on http://localhost:${PORT}`;
        return console.log(message);
    });
});
