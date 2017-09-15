import {gql } from 'react-apollo';


export const UserQuery = gql`
	query UserQuery{
		user {
			id
			name
			profilePic { id, url }
			groups { id, name }
		}
	}
`
