import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    description: '',
    category: '',   //this is an enum, options need to be loaded from enum properties
	imageUrl: '',
	isSubmitting: false,
	file: null,
	postedFileId: ''
  }
	
	isSubmittable() {
		return this.state.description && this.state.file && !this.state.isSubmitting;
	}
	
	onDrop(event) {
		event.preventDefault();
		console.log("on drop:", event);
		return false;
	}
	dropHandler = null;
	componentWillMount() {
		this.dropHandler = (event) => {return this.onDrop(event);};
		$(document).on('drop', this.dropHandler);
		$(document).on('dragover', function(){console.log('dragging');});
		console.log('added drop handler');
	}
	componentWillUnmount() {
		if(this.dropHandler != null) {
			$(document).off('drop', this.dropHandler);
			this.dropHandler = null;
		}
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
			<div className='w-100 pa4 flex justify-center'>
				<div style={{ maxWidth: 400 }} className=''>
					<input
						className='w-100 pa3 mv2'
						value={this.state.description}
						placeholder='Description'
						onChange={(e) => this.setState({description: e.target.value})}
					/>
					<input
						className='w-100 pa3 mv2'
						value={this.state.category}
						placeholder='Category -> Try KITTENS or WTF'
						onChange={(e) => this.setState({category: e.target.value})}
					/>
					<input type='file' class='w-100 pa3 mv2' accept="image/*"
						onChange={this.handleFileSelect.bind(this)}
						onClick={(event)=> { 
							event.target.value = null;
						}}
					/>
					<div className='imegaPreview w-100'>
						{this.state.imageUrl && 
							<img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
						}
						{!this.state.imageUrl && 
							<span>Kein Bild ausgewählt.</span>
						}
					</div>
					<button disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.handlePost}>{this.state.isSubmitting ? 'Submitting ...' : 'Post'}</button>
				</div>
			</div>
		)
	}

	handlePost = () => {
		this.setState({'isSubmitting': true});
		
		let data = new FormData();
		data.append('data', this.state.file);
		
		fetch('https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl', {
			body: data,
			method: 'POST'
		}).then((response) => {
			response.json().then(result => {
				//self.setState({imageUrl: result.url});
				this.setState({postedFileId: result.id});
				const {description, category, postedFileId} = this.state
				this.props.mutate({variables: {description, postedFileId, category}})
					.then(() => {
						this.props.router.replace('/')
					});
			});
		}).catch((exception) => {
			// TODO: handle upload error
			console.log('error uploading the file!');
			this.setState({'isSubmitting': false});
		});
	}
	
	handleFileSelect(event) {
		var self = this;
		if(event.target.files.length >= 1) {
			var file = event.target.files[0];
			this.setState({'file': file});
			var reader = new FileReader();
			
			reader.addEventListener("load", () => {
				this.setState({imageUrl: reader.result});
			}, false);
			
			reader.readAsDataURL(file);
		}
	}
}

const createPost = gql`
	mutation ($description: String!, $category: POST_CATEGORY!, $postedFileId: ID!) {
		createPost(description: $description, postedFileId: $postedFileId, category: $category) {
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

export default graphql(createPost)(
	graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
)
