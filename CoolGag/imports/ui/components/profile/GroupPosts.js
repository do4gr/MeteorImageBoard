import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import MyGroups from '/imports/ui/components/profile/MyGroupsList'
import { Button,Label } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';


class GroupPosts extends React.Component{

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
                    <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }} className="feed-container">
                        {this.props.data.group.posts.map((post) =>
                            <PostPreview key={post.id} post={post} />
                        )}
                    </Col>
                </Row>
            </Container>
            </div>
		)
	}


}

export default GroupPosts