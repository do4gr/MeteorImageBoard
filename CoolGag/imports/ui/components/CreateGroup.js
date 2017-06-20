import React from 'react';
import { withRouter } from 'react-router';
import { gql, graphql, compose, withApollo } from 'react-apollo';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import UserQuery from '/imports/ui/containers/UserQuery'

class CreateGroup extends React.Component{

		static propTypes = {
			router: PropTypes.object.isRequired,
			data: PropTypes.object.isRequired,
		}

	render () {
		if (this.props.data.loading) {
	      	return (<div>Loading</div>)
	    }

	    if (this.props.data.error) {
		    console.log(this.props.data.error)
		    return (<div>An unexpected error occurred</div>)
		}

		return (
			<div>Here we go</div>

		)
	}

}

const createGroup = gql`
	mutation createGroup($name: String!, $userId: ID! ){
		createGroup(
			name: $name,
			usersIds: $userId
		){
			id
		}
	}
`

export default compose(
	graphql(createGroup)
)(withApollo(withRouter(CreateGroup)))
