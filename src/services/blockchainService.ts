import * as dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS as string;

const abi = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_favoriteNumber", type: "uint256" },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "nameToFavoriteNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "people",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "favoriteNumber", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "removeLastPerson",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_favoriteNumber", type: "uint256" },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

export const retrieveFavoriteNumber = async (): Promise<number> => {
  return await contract.retrieve();
};

export const storeFavoriteNumber = async (
  favoriteNumber: number
): Promise<void> => {
  const tx = await contract.store(favoriteNumber);
  await tx.wait();
};

export const addPerson = async (
  name: string,
  favoriteNumber: number
): Promise<void> => {
  const tx = await contract.addPerson(name, favoriteNumber);
  await tx.wait();
};

export const getFavoriteNumberByName = async (
  name: string
): Promise<number> => {
  return Number(await contract.nameToFavoriteNumber(name));
};

export const removeLastPerson = async (): Promise<void> => {
  const tx = await contract.removeLastPerson();
  await tx.wait();
};

export const getAllPeople = async (): Promise<
  { name: string; favoriteNumber: number }[]
> => {
  let i = 0;
  const people = [];

  while (true) {
    try {
      const person = await contract.people(i);
      people.push({
        name: person.name,
        favoriteNumber: Number(person.favoriteNumber),
      });
      i++;
    } catch (error) {
      break;
    }
  }
  return people;
};

export const getPersonByIndex = async (
  index: number
): Promise<{ name: string; favoriteNumber: number }> => {
  const person = await contract.people(index);
  return {
    name: person.name,
    favoriteNumber: Number(person.favoriteNumber),
  };
};

export const updateFavoriteNumber = async (
  name: string,
  newFavoriteNumber: number
): Promise<void> => {
  await removeLastPerson();
  await addPerson(name, newFavoriteNumber);
};
