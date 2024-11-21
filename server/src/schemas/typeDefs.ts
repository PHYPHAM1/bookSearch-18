import { gql } from 'graphql-tag';

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User  
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    input BookInput {
        bookId: String
        author: [String]
        title: String
        description: String
        image: String
        link: String
    }
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String): Auth
        savedBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

export default typeDefs;