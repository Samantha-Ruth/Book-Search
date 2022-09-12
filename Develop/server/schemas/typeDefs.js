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
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
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
    saveBook(authors: [String!], description: String, title: String!, bookId: String!, image: String, link: String): User
    deleteBook(bookId: String!): User
}

type Auth {
    token: ID!
    user: User
}

`;

module.exports = typeDefs;