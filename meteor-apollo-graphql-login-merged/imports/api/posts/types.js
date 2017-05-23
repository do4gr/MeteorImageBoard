import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';

// Example GraphQL query relying on a nested reviews field.
//
// {
//   books {
//     _id
//     title
//     reviews {
//       name
//       review
//     }
//   }
// }

export const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'GraphQL type for posts.',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    read: { type: GraphQLBoolean },
    imageUrl: { type: GraphQLString },
    // reviews: {
    //   type: Review,
    //   resolve(book) {
    //     return Reviews.find({ book: book._id });
    //   },
    // },
  },
});
