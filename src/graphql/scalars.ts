import { GraphQLScalarType, Kind } from 'graphql';

export const BigIntScalar = new GraphQLScalarType({
  name: 'BigInt',
  description: 'BigInt custom scalar type',
  serialize(value: unknown) {
    return value?.toString(); // Convert BigInt to string for output
  },
  parseValue(inputValue: unknown) {
    return BigInt(inputValue as string | number | bigint | boolean); // Convert input to BigInt
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return BigInt(ast.value); // Convert AST literal to BigInt
    }
    return null;
  },
});
