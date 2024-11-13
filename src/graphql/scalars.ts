import { GraphQLScalarType, Kind } from "graphql";

export const BigIntScalar = new GraphQLScalarType({
  name: "BigInt",
  description: "BigInt custom scalar type",
  serialize(value: unknown) {
    return value?.toString();
  },
  parseValue(inputValue: unknown) {
    return BigInt(inputValue as string | number | bigint | boolean);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return BigInt(ast.value);
    }
    return null;
  },
});
