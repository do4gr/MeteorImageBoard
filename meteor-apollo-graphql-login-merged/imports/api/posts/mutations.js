import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { Post } from './types';
import { Posts } from './posts';

export default {
  createPost: {
    type: Post,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      read: { type: new GraphQLNonNull(GraphQLBoolean) },
      imageUrl: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, { title, description, read, imageUrl }) {
      const id = Posts.insert({ title, description, read, imageUrl });
      return { id, title, description, read, imageUrl };
    },
  },
};
