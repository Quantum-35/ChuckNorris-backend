import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import globalMiddleware from '../middleware/global';
import schema from './schema';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

// middleware
globalMiddleware(app);

const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)]
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
    const message = `Server is running on http://localhost:${PORT}`;
    return console.log(message);
});