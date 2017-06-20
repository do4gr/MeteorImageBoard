import {gql,  graphql, fetchPolicy } from 'react-apollo';
import CreateGroup from '/imports/ui/components/CreateGroup'

const UserQuery = gql`
	query {
		user {
			id
			name
		}
	}
`

export default graphql(UserQuery, fetchPolicy : 'network-only')(CreateGroup)
