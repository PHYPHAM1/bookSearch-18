// Import the ApolloServer class
import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; //for apllo to connect w express
import db from './config/connection.js';
import { authenticateToken } from './services/auth.js';

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // introspection: true,
});


const app = express();
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //todo: do i need this? MERN setup.. will need this later to serve the front end
  //installed the lastest version of express, to fix the sendFile error
  if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../client/dist')));
    
     app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  //connecting graphql to express server  localhost:3001/graphql(this is the apollo sandbox)
  app.use('/graphql', expressMiddleware(server as any, { context: authenticateToken as any})); 

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
