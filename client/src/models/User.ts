export default interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    savedBooks: [string];
    bookCount: number;
  }
  