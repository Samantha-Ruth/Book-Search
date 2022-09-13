const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    authors: [String]
    bookId: String
    description: String
    image: String
    title: String
    link: String
   
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    savedBooks(username: String): [Book]
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, password: String!, email: String!): Auth
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: String!): User
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

type Auth {
    token: ID!
    user: User
}

`;

module.exports = typeDefs;