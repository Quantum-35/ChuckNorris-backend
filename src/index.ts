import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import globalMiddleware from '../middleware/global';
import schema from './schema';



dotenv.config();

const { PORT, BASE_URL } = process.env;
const app = express();
const port = PORT || 3002;

// middleware
globalMiddleware(app);

const server = new ApolloServer({
    schema,
    context: (request: any) => ({
        req: request,
        url: BASE_URL
    }),
    validationRules: [depthLimit(7)]
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port }, () => {
    const message = `Server is running on http://localhost:${PORT}`;
    return console.log(message);
});