import { IResolvers } from 'graphql-tools';

import Query from './resolvers/query';
import Mutation from './resolvers/mutation';

const resolverMap: IResolvers = {
    Query: {
        ...Query
      },
    Mutation: {
        ...Mutation
    }
}

export default resolverMap;