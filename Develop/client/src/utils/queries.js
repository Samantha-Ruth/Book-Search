import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
         _id
         username
         email
         bookCount
         savedBooks {
            _id
            bookId
            authors
            description
            title
            image
            link
         }
      }
`;

export const GET_ME_BASIC = gql`
  {
    me {
      username
      savedBooks {
        _id
        bookId
        title
      }
    }
  }
`;