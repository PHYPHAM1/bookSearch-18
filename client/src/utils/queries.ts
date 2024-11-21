import { gql } from '@apollo/client';

//todos: queries.ts: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.???
export const GET_ME = gql`
  query me {
    me {
      _id
      name
      email
      password
      savedBook
      bookCount
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      name
      email
      password
      savedBook
      bookCount
    }
  }
`;

export const QUERY_BOOK = gql`
  query books($bookId: String) {
    books(bookId: $bookId) {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

//TODOS: NOT sure if i need this?
// export const QUERY_AUTH = gql`
//   query Auth($token: number){
//       Auth(token: $token){
//       Token
//       User
//       }
//     }
// `;