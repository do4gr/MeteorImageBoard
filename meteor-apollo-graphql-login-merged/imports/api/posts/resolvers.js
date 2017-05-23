import { GraphQLList, GraphQLString } from 'graphql';
import { Posts } from './posts';
import { Post } from './types';

export default {
  type: new GraphQLList(Post),
  args: {
    id: {
      name: 'id',
      type: GraphQLString,
    },
  },
  resolve(parent, args) {
    // We can use any database here, not just MongoDB. Think of the resolve() method as a
    // blackbox that just needs to return data matching the type property. In this case, we need
    // to return an array of books matching the Book type above.
    return Posts.find(args).fetch();
  },
};
