import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';


class GroupMembers extends React.Component{
	static propTypes = {
	    data: PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			groupUser: React.PropTypes.object,
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
							<Link to={`/publicProfile/${this.props.groupUser.id}`} className="profile-post-link">
								<div>{this.props.groupUser.name}</div>
							</Link>

						</Col>
					</Row>
				</Container>
			</div>
			)
	}
}

export default GroupMembers
