import {gql,  graphql, fetchPolicy } from 'react-apollo';


export const UserQuery = gql`
	query {
		user {
			id
			name
			profilePic { id, url }
		}
	}
`


