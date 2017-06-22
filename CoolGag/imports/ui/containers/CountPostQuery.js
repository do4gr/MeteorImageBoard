import React from 'react';
import { gql, graphql } from 'react-apollo';

import VotingCommentPoints from '/imports/ui/components/VotingCommentPoints'

export const CountPostQuery = gql`
	query countPostQuery($id: ID!){
		Post(id: $id){
		    id
		    _usersWhoDownvotedMeta{
		      	count
		    }
		    _usersWhoUpvotedMeta{
		        count
		    }
		    _commentsMeta{
		        count 
		    }
		  }
	}`

