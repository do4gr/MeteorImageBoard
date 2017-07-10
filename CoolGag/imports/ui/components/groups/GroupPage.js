import React from 'react'
import { gql, graphql, withApollo, compose, fetchPolicy } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button,Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap'
import { Link, BrowserRouter as Router, Route, withRouter } from 'react-router';
import GroupMembers from '/imports/ui/components/groups/GroupMembers'
// import GroupPosts from '/imports/ui/components/groups/GroupPosts'
import { GroupPostsQuery } from '/imports/ui/containers/groupQueries/GroupPostsQuery'
import MyGroups from '/imports/ui/components/groups/MyGroupsList'
import CreatePost from '/imports/ui/components/CreatePost'
import PostUpload from '/imports/ui/components/Posts/PostUpload'
import TagUtils from '/imports/ui/components/TagUtils';
import PostUtils from '/imports/ui/components/Posts/PostUtils';
import PostPreview from '/imports/ui/components/PostPreview'

class GroupPage extends React.Component{
	static propTypes = {
    	data: PropTypes.object,
    	router: React.PropTypes.object.isRequired,
    	params: React.PropTypes.object.isRequired,
  	}


	render(){
		console.log(this.props)
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
						<Col xs="12" sm={{ size: 10, offset: 1 }} lg={{ size: 9, offset: 1.5 }}>
							<div className="text-center group-title">{this.props.data.Group.name}</div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" sm="12" md="11" lg="10">
							<div className="pull-right">
							<Link to={`/createPost/${this.props.data.Group.id}`}>
								<Button color="info">+&nbsp;Post</Button>
							</Link>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" sm="6" md={{ size: 2, offset: 1 }} lg={{ size: 2.5, offset: 1.5 }}>
							<div className="heading2">Members</div>
							{this.props.data.Group.users.map((groupUser) =>              
                  					<GroupMembers key={groupUser.id} groupUser={groupUser}  data={this.props.data} handleCancel={this.goBack}/>
                  				
                			)}
						</Col>

						<Col xs="12" sm={{ size: 10, offset: 1 }} md={{ size: 7, offset: 1 }} lg={{ size: 6, offset: 1.5 }} className="feed-container">
	                        {this.props.data.Group.posts.map((post) =>
	                            <PostPreview key={post.id} post={post} handleCancel={this.goBack}/>
	                        )}
                    	</Col>
					</Row>
				</Container>
			</div>
		)
	}	
}

goBack = () => {
    this.props.router.replace('/mygroups/')
  }

const Group = ({ match }) => (
  <div>
    <h2>Group: {match.params.group}</h2>
  </div>
)


const userQuery = gql`
	query {
		user {
			id
		}
	}
`


const GroupPageWithData = compose(
	graphql(userQuery, fetchPolicy: "network-only" ),
	graphql(GroupPostsQuery, {
	  	options: (ownProps) => ({
		    variables: {
		        	groupId: ownProps.params.groupId
		      	}
		    })
	  	}
	)
)(withApollo(withRouter(GroupPage)))

export default GroupPageWithData