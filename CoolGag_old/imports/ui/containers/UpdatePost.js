import React from 'react';
import { gql, graphql } from 'react-apollo';
import update from 'immutability-helper';
import CountPostQuery from '../queries/CountPostQuery';

const UpvotePost = gql`
 	mutation addToUserUpvotedPost($userId: ID!, $postId: ID!) {
  		addToUserUpvotedPost(usersWhoUpvotedUserId: $userId, upvotedPostsPostId: $postId) {
    		usersWhoUpvotedUser {
		      	id
		      	name
   			}
  		}
}`

const UpvotesPageWithMutations = graphql(UpvotePost, {
  props({ ownProps, mutate }) {
    return {
      upvotePost({ usersWhoUpvotedUserId, upvotedPostsPostId }) {
        return mutate({
          variables: { usersWhoUpvotedUserId, upvotedPostsPostId },
          optimisticResponse: {
            __typename: 'Mutation',
            addToUserUpvotedPost: {
            	usersWhoUpvotedUser: {
	              __typename: 'User',
	              id: usersWhoUpvotedUserId,
              },
            },
          },
          update: (store, { data: { addToUserUpvotedPost } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: CountPostQuery });
            // Add our comment from the mutation to the end.
            data.usersWhoUpvoted.push(addToUserUpvotedPost);
            // Write our data back to the cache.
            store.writeQuery({ query: CountPostQuery, data });
          },
        });
      },
    };
  },
})(VotingSystemPost);