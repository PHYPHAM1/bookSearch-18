// import { useState, type FormEvent } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';//QUERY_BOOK,
import { REMOVE_BOOK } from '../utils/mutations';// ADD_USER, LOGIN_USER SAVE_BOOK, 

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';



const SavedBooks = () => {
    // const { bookId } = useParams();
    const { loading, data} = useQuery(GET_ME);
    //todos: Remove the useEffect() hook that sets the state for UserData.Instead, 
    //todos: use the useQuery() hook to execute the GET_ME query on load and save it to a variable named userData.
    
    // const [savedBook] = useMutation(SAVE_BOOK);
    const [removeBook] = useMutation(REMOVE_BOOK);
    
    //waiting for data from query_book to be available
    // const books = data?.books || [];
    if(loading){
        return <div>Loading...</div>;
    }

  

  const userData = data?.me || {};
  


//todos: handleDeleteBook correct?
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: any) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }
        try {
          await removeBook({variables: bookId});
        
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
        } catch (err) {
        console.error(err);
        }
        };

        if(loading){
            return <h2>Loading...</h2>;
        }


  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book: any) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );



};

export default SavedBooks;
