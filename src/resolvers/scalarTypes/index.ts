import { GraphQLScalarType } from 'graphql';

const Scalar = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid Date time',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: (ast: any) => ast.value
      })
};

export default Scalar;
