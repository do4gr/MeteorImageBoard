import React from 'react';
import { withRouter } from 'react-router';
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo';
import {Button} from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import FileSelectButton from './FileHandling/FileSelectButton';
import WindowDropZone from './FileHandling/WindowDropZone';
import FileHandling from './FileHandling/FileHandling';
import TagUtils from './TagUtils';
import PredefinedMemeSelect from './PredefinedMemeSelect';
import PostUtils from './Posts/PostUtils';
import {Container, Row, Col} from 'reactstrap';
import PostUpload from './Posts/PostUpload';

class CreatePost extends React.Component {

	static propTypes = {
		router: PropTypes.object.isRequired,
		mutate: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
		group: PropTypes.object
	}

	state = {
		description: '',
		category: '',   //this is an enum, options need to be loaded from enum properties
		imageUrl: '',
		imageSize: {width: 0, height: 0},
		isSubmitting: false,
		isRendering: false,
		file: null,
		postedFileId: '',
		isDraggingFile: false,
		isValidType: true,
		isLoadingFile: false,
		isTextEntered: false,
		isPredefinedMeme: false,
		userId: ''
	}


	render () {
		if (this.props.data.loading) {
			return (<div>Loading</div>)
		}

		// redirect if no user is logged in
		if (!this.props.data.user) {
			console.warn('only logged in users can create new posts')
			this.props.router.replace('/')
		}

		return (
			<PostUpload enableMemeSelect={true}></PostUpload>
		)
	}
}

const createPost = gql`
	mutation ($description: String!, $groupId: ID!, $category: POST_CATEGORY, $postedFileId: ID!, $userId: ID!, $tags: [PosttagsTag!]) {
		createPost(
			description: $description,
			postedFileId: $postedFileId,
			category: $category,
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
  graphql(createPost),
  graphql(userQuery, fetchPolicy: "network-only" )
)(withApollo(withRouter(CreatePost)))
