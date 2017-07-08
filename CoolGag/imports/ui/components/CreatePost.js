import React from 'react';
import { withRouter, Route, Link, Redirect } from 'react-router';
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TagUtils from '/imports/ui/components/TagUtils';
import PostUtils from '/imports/ui/components/Posts/PostUtils';
import PostUpload from '/imports/ui/components/Posts/PostUpload';
import GroupPage from '/imports/ui/components/groups/GroupPage'

class CreatePost extends React.Component {

	static propTypes = {
		router: PropTypes.object.isRequired,
		mutate: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
    	params: React.PropTypes.object.isRequired,
	}

	state = {
		isSubmitting: false,
		postUploadCallbacks: {}
	}

	postUpload = null;

	render () {
		console.log(this.props)
		if (this.props.data.loading) {
			return (<div>Loading</div>)
		}

		// redirect if no user is logged in
		if (!this.props.data.user) {
			console.warn('only logged in users can create new posts')
			this.props.router.replace('/')
		}
		
		if(this.postUpload == null) {
			this.postUpload = (
				<PostUpload 
					callbacks={this.state.postUploadCallbacks}
					enableMemeSelect={true}
					enableDescription={true}
					onUploaded={this.onFileUploaded.bind(this)}
				></PostUpload>
			);
			window.postUpload = this.postUpload;
		}
		
		return this.postUpload;
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
						groupId: this.props.params.groupId != null ? this.props.params.groupId : null
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
					if(this.props.params.groupId != null){
						const groupId = this.props.params.groupId;
						<Redirect to={`/group/${this.props.params.groupId}`} push={push} />;

					}else{
						this.props.router.replace('/');
					}
				});
			}
		});
	}
}

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

export default compose(
  graphql(createPost,{
	  	options: (ownProps) => ({
		    variables: {
		        	groupId: ownProps.params.groupId
		      	}
		    })
	  	}),
  graphql(userQuery, fetchPolicy: "network-only" )
)(withApollo(withRouter(CreatePost)))
