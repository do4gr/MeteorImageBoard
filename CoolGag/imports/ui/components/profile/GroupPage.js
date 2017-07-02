import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql, withApollo, compose, fetchPolicy } from 'react-apollo'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import MyGroups from '/imports/ui/components/profile/MyGroupsList'
import { Button,Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link, BrowserRouter as Router, Route } from 'react-router';
import GroupMembers from '/imports/ui/components/profile/GroupMembers'
// import GroupPosts from '/imports/ui/components/profile/GroupPosts'
import { GroupPostsQuery } from '/imports/ui/containers/profileLists/GroupPostsQuery'
import CreatePost from '/imports/ui/components/CreatePost'
import PostUpload from '/imports/ui/components/Posts/PostUpload'
import TagUtils from '/imports/ui/components/TagUtils';
import PostUtils from '/imports/ui/components/Posts/PostUtils';

class GroupPage extends React.Component{
	static propTypes = {
    	data: PropTypes.object,
    	router: React.PropTypes.object.isRequired,
    	params: React.PropTypes.object.isRequired,
  	}
  	constructor(props) {
	    super(props);
	    this.state = {
	      modal: false
	    };

	    this.toggle = this.toggle.bind(this);
	}

	state = {
		isSubmitting: false,
		postUploadCallbacks: {}
	}

	postUpload = null;

	toggle() {
	    this.setState({
	      	modal: !this.state.modal
	    });
	}


  	handleCreatePost = (event) =>{
		this.props.router.replace('/createPost/')
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
								<Button color="info" onClick={ this.toggle }>+&nbsp;Post</Button>
								<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						          <ModalHeader toggle={this.toggle}>CreatePost</ModalHeader>
						          <ModalBody>
						          {//<CreatePost group={this.props.data.Group}/>
						          }
						          <PostUpload 
						          	group={this.props.data.Group} 
						          	callbacks={this.state.postUploadCallbacks}
									enableMemeSelect={true}
									enableDescription={true}
									onUploaded={this.onFileUploaded.bind(this)}/>
						          	
						          </ModalBody>
						          <ModalFooter>
						          	<Button color="primary" onClick={this.toggle}>Finished</Button>{' '}
						            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
						          </ModalFooter>
						        </Modal>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" sm="6" md={{ size: 2, offset: 1 }} lg={{ size: 2.5, offset: 1.5 }}>
							<div className="heading2">Members</div>
							{this.props.data.Group.users.map((groupUser) =>              
                  					<GroupMembers key={groupUser.id} groupUser={groupUser}  data={this.props.data}/>
                  				
                			)}
						</Col>

						<Col xs="12" sm={{ size: 10, offset: 1 }} md={{ size: 7, offset: 1 }} lg={{ size: 6, offset: 1.5 }} className="feed-container">
	                        {this.props.data.Group.posts.map((post) =>
	                            <PostPreview key={post.id} post={post} />
	                        )}
                    	</Col>
					</Row>
				</Container>
			</div>
			)
	}


	onFileUploaded(file) {
		//self.setState({imageUrl: result.url});
		
		var postedFileId = file.id;
		var userId = this.props.data.user.id;
		var description = file.description;
		var tagsTextList = TagUtils.findTags(description).textList;
		var tags = tagsTextList.map((element) => {
			return {text: element};
		});
		PostUtils.requestTags({
			client: this.props.client,
			tags: tagsTextList,
			callback: (actualTags) => {
				var existingTagIds = [];
				for(var i = 0; i < actualTags.length; i++) {
					var actual = actualTags[i];
					for(var j = 0; j < tags.length; j++) {
						if(tags[j].text == actual.text) {
							tags[j].id = actual.id;
							tags.splice(j,1);
							existingTagIds.push(actual.id);
							j -= 1;
						}
					}
				}
				this.props.mutate({
					variables: {
						description: description,
						postedFileId: postedFileId,
						userId: userId,
						tags: tags,
						groupId: this.props.data.Group != null ? this.props.data.Group.id : null
					}
				}).then((result) => {
					var promisses = [];
					for(var i = 0; i < existingTagIds.length; i++) {
						promisses.push(PostUtils.addExistingTag({
							client: this.props.client,
							postId: result.data.createPost.id,
							tagId: existingTagIds[i]
						}));
					}
					// TODO(rw): check, if the reference adding worked
					//for(var i = 0; i < promisses.length; i++) {
					//	await promisses[i];
					//}
					<Route path={`/group/${this.props.data.Group.id}`} component={GroupPage}/>
				});
			}
		});
	}
}

const Group = ({ match }) => (
  <div>
    <h2>Group: {match.params.group}</h2>
  </div>
)

const createPost = gql`
	mutation ($description: String!, $groupId: ID, $postedFileId: ID!, $userId: ID!, $tags: [PosttagsTag!]) {
		createPost(
			description: $description,
			postedFileId: $postedFileId,
			userId: $userId,
			tags: $tags,
			groupId: $groupId)
		{
			id
			postedFile { id }
		}
	}
`

const userQuery = gql`
	query {
		user {
			id
		}
	}
`


const GroupPageWithData = compose(
	graphql(createPost),
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