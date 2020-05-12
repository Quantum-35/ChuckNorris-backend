import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import mongoose from 'mongoose';

import globalMiddleware from '../middleware/global';
import schema from './schema';



dotenv.config();

const { PORT, BASE_URL, DB_URL, NODE_ENV } = process.env;
const app = express();
const port = PORT || 3002;

// middleware
globalMiddleware(app);

// Connect to mongo database
mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  
  mongoose.connection.once('open', () => {
    console.log('Connected to the database');
  });
  

const server = new ApolloServer({
    schema,
    context: (request: any) => {
        return {
            req: request,
            url: BASE_URL,
            db: DB_URL
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