import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar BigInt

  type Person {
    name: String!
    favoriteNumber: BigInt!
  }

  type User {
    id: ID!
    name: String!
    favoriteNumber: BigInt!
    createdAt: String!
  }

  type Query {
    retrieveFavoriteNumber: BigInt!
    getFavoriteNumberByName(name: String!): BigInt!
    fetchUsers: [User!]!
    getAllPeople: [Person!]!
    getPersonByIndex(index: Int!): Person
  }

  type Mutation {
    storeFavoriteNumber(favoriteNumber: BigInt!): String
    addPerson(name: String!, favoriteNumber: BigInt!): String
    addUser(name: String!, favoriteNumber: BigInt!): User!
  }
`;
