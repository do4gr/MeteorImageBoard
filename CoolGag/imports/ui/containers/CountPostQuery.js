import React from 'react';
import { gql, graphql } from 'react-apollo';


const CountPostQuery = gql`
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

export default CountPostQuery;