import {
  addPerson,
  getAllPeople,
  getFavoriteNumberByName,
  getPersonByIndex,
  retrieveFavoriteNumber,
  storeFavoriteNumber,
} from "../services/blockchainService";
import { addUser, fetchUsers } from "../services/dbService";
import { BigIntScalar } from "./scalars";

export const resolvers = {
  BigInt: BigIntScalar,
  Query: {
    retrieveFavoriteNumber: async () => {
      return await retrieveFavoriteNumber();
    },
    getFavoriteNumberByName: async (_: any, { name }: { name: string }) => {
      return await getFavoriteNumberByName(name);
    },
    fetchUsers: async () => {
      return await fetchUsers();
    },
    getAllPeople: async () => {
      return await getAllPeople();
    },
    getPersonByIndex: async (_: any, { index }: { index: number }) => {
      return await getPersonByIndex(index);
    },
  },
  Mutation: {
    storeFavoriteNumber: async (
      _: any,
      { favoriteNumber }: { favoriteNumber: number }
    ) => {
      await storeFavoriteNumber(favoriteNumber);
      return "Favorite number stored successfully!";
    },
    addPerson: async (
      _: any,
      { name, favoriteNumber }: { name: string; favoriteNumber: number }
    ) => {
      await addPerson(name, favoriteNumber);
      return "Person added successfully!";
    },
    addUser: async (
      _: any,
      { name, favoriteNumber }: { name: string; favoriteNumber: number }
    ) => {
      return await addUser(name, favoriteNumber);
    },
  },
};
