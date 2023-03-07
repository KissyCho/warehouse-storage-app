import { ApolloServer } from 'apollo-server';

import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { initializeDatabase } from './db/database.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 9090;

const server = new ApolloServer({ resolvers, typeDefs});

server.listen({ port }, async() => {
    console.log(`Server runs at: http://localhost:${port}`)
    await initializeDatabase();
})

