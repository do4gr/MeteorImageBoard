import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button,Label } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';


class GroupMembers extends React.Component{
	static propTypes = {
	    data: PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			Group: React.PropTypes.object,
	    }).isRequired
	}


	render(){
		if (this.props.data.loading) {
  			return (<div>Loading</div>)
		}

    	if (this.props.data.error) {
      		console.log(this.props.data.error)
      		return (<div>An unexpected error occurred</div>)
		}

		return(
			<div>
			<Container>
				<Row>
					<Col>
						<div>Members</div>
					</Col>
					<Col>					
						{this.props.data.Group.users.map((groupUser) =>
                  			<div> {groupUser.name},  </div>
                		)}
					</Col>
				</Row>
			</Container>
          </div>

			)
	}


}

export default GroupMembers