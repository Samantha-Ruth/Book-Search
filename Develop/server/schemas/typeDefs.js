const { gql } = require('apollo-server-express');
const typeDefs = gql `
    type User {}

    type Book {}
    
    type Query {}
    
    type Mutation {}
    
    type Auth {}

`;

module.exports = typeDefs;