import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
    # //'login' here has to match the 'type Mutation name'
    login(email: $email, password: $password) {
        token
        user{
          _id
          username
        }
        
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
          token
          user {
          _id
          username
          }
        }
    }
`;

export const SAVE_BOOK = gql`
  mutation savedBook($bookData: BookInput!) {
    savedBook(bookData: $bookData) {
      _id
      username
      savedBooks{
          bookId
          authors
          title
          description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      user{
          _id
          username
          }
    }
  }
`;
