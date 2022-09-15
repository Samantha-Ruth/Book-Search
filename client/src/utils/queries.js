import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        description
        image
        title
        link
      }
    }
  }
`;

export const GET_ME_BASIC = gql`
  {
    me {
      username
      savedBooks {
        authors
        bookId
        description
        title
        image
        link
      }
    }
  }
`;
