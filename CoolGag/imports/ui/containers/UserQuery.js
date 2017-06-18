import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CreateGroup from '/imports/ui/components/CreateGroup'

const UserQuery = gql`
	query {
		user {
			id
		}
	}
`

export default graphql(UserQuery)(CreateGroup)