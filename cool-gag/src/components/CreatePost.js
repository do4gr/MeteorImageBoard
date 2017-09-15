import React from 'react';
import { withRouter, Route, Link, Redirect } from 'react-router';
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo';
import {Button, Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TagUtils from './TagUtils';
import PostUtils from './Posts/PostUtils';
import PostUpload from './Posts/PostUpload';
import GroupPage from './groups/GroupPage'
import PostYoutube from './Posts/PostYoutube';


class CreatePost extends React.Component {

	static propTypes = {
		router: PropTypes.object.isRequired,
		mutate: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
		group: PropTypes.object
	}

	state = {
		isSubmitting: false,
		description: '',
		postUploadCallbacks: {},
		isUploadSelected: true,
		isUpload : null,
		isLink : null
	}

	postUpload = null;

	render () {
		if (this.props.data.loading) {
			return (<div>Loading</div>)
		}

		// redirect if no user is logged in
		if (!this.props.data.user) {
			console.warn('only logged in users can create new posts')
			this.props.router.replace('/')
		}

		if (this.state.isUpload){
		return (
			<div className="container">
				<Container className="nested">
					<Row>
						<Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
							<Button type="button" className='pa3 bn ttu pointer bg-black-10 dim btn-normal' onClick={this.handleLink.bind(this)}>Upload Link</Button>
						</Col>
					</Row>
					<PostUpload
							callbacks={this.state.postUploadCallbacks}
							enableMemeSelect={true}
							onUploaded={this.onFileUploaded.bind(this)}
							shouldUpload={this.state.isUploadSelected}
							isSubmittable={this.state.description != ''}
							enableDescription = {true}
					/>
				</Container>
			</div>

		);
	}

	if (this.state.isLink){
		return(
			<div className="container">
				<Container className="nested">
					<Row>
						<Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
							<Button type="button" className='pa3 bn ttu pointer bg-black-10 dim btn-normal' onClick={this.handleMeme.bind(this)}>Select Meme</Button>{" "}
						</Col>
					</Row>
					<PostYoutube group={this.props.params}/>
				</Container>
			</div>
		)
	}

	return(
		<div className="container">
			<Container className="nested">
				<Row>
					<Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
						<Button type="button" className='pa3 bn ttu pointer bg-black-10 dim btn-normal' onClick={this.handleMeme.bind(this)}>Select Meme</Button>{" "}
						<Button type="button" className='pa3 bn ttu pointer bg-black-10 dim btn-normal' onClick={this.handleLink.bind(this)}>Upload Link</Button>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

	handleMeme(e){
		if (this.state.isUpload){
			this.setState({isUpload : false})
		}else {
			this.setState({isUpload : true})
		}
		if (this.state.isLink){
			this.setState({isLink : false})
		}
	}

	handleLink(e){
		if (this.state.isLink){
			this.setState({isLink : false})
		}else {
			this.setState({isLink : true})
		}
		if (this.state.isUpload){
			this.setState({isUpload : false})
		}
	}


	onFileUploaded(file) {
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
						// const groupId = this.props.params.groupId;
						this.props.router.replace('/mygroups/');

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
		authenticatedUser {
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
