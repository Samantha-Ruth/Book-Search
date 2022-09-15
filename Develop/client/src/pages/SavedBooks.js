import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// importing useQuery hook from the Apollo Client
import { useQuery, useMutation } from '@apollo/client'
import { GET_ME_BASIC } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

// Need to replace the utils/API calls
// import { deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  //This will set useState - do we need a state hook here? 
  // const [userData, setUserData] = useState({});
  // Use query hook to make query request. Loading indicates request isn't done; info is stored in data property; data.me
  const { loading, data } = useQuery(GET_ME_BASIC);
  const [deleteBook] = useMutation(DELETE_BOOK);
  //optional chaining negates the need to check if an object exists before accessing it's properties
  // if data exists, store in "me" If data is undefined, save an empty object to the "me" component.
  const userData = data?.me || {};
  console.log(userData)

  if(!userData?.username) {
    return (
      <h3>
        Please log in or sign up to view this page.
      </h3>
    )
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: { bookId: bookId },
        // update: cache => {
        //   const data = cache.readQuery({ query: GET_ME_BASIC });
        //   // savedCache pulls all saved books out of UserData
        //   const savedCache = data.me.savedBooks;
        //   // updatedCache is list of books without the id of the one we want to delete
        //   const updatedCache = savedCache.filter((book) => book.bookId !== bookId );
        //   // HOW DO I UPDATE data.me.savedBooks with updatedCache? 

        //   // data.me.savedBooks = updatedCache;
        //   cache.writeQuery({
        //     // add updatedCache to data?
        //     query: GET_ME_BASIC,
        //     data: {
        //       data: {...data.me.savedBooks, ...updatedCache}
        //     }
        //   })
        // }
        })

      // upon success, remove book's id from localStorage
      removeBookId(bookId)
      window.location.reload(true);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
