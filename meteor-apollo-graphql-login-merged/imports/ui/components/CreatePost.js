import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends React.Component {

	static propTypes = {
		router: React.PropTypes.object,
		mutate: React.PropTypes.func,
		data: React.PropTypes.object
	}
	
	state = {
		description: '',
		category: '',   //this is an enum, options need to be loaded from enum properties
		imageUrl: '',
		isSubmitting: false,
		file: null,
		postedFileId: '',
		isDraggingFile: false,
		isLoadingFile: false
	}
	
	isSubmittable() {
		return this.state.description && this.state.file && !this.state.isSubmitting;
	}
	
	onDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		this.setState({'isDraggingFile': false});
		var file = null;
		if(event.dataTransfer.files.length >= 1) {
			file = event.dataTransfer.files[0];
		}
		this.handleFileSelect(file);
		return false;
	}
	onDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
		this.setState({'isDraggingFile': true});
		return false;
	}
	onDragEnter(event) {
		if(event.currentTarget == window) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	}
	onDragLeave(event) {
		if(event.currentTarget == window) {
			event.stopPropagation();
			event.preventDefault();
			this.setState({'isDraggingFile': false});
			return false;
		}
	}
	onDragEnd(event) {
		event.stopPropagation();
		event.preventDefault();
		this.setState({'isDraggingFile': false});
		return false;
	}
	dropHandler = null;
	dragOverHandler = null;
	dragEnterHandler = null;
	dragLeaveHandler = null;
	dragEndHandler = null;
	componentDidMount() {
		this.dropHandler = (event) => {return this.onDrop(event);};
		window.addEventListener('drop', this.dropHandler);
		this.dragOverHandler = (event) => {return this.onDragOver(event);};
		window.addEventListener('dragover', this.dragOverHandler);
		this.dragEnterHandler = (event) => {return this.onDragEnter(event);};
		window.addEventListener('dragenter', this.dragEnterHandler);
		this.dragLeaveHandler = (event) => {return this.onDragLeave(event);};
		window.addEventListener('dragleave', this.dragLeaveHandler);
		this.dragEndHandler = (event) => {return this.onDragEnd(event);};
		window.addEventListener('dragend', this.dragEndHandler);
	}
	componentWillUnmount() {
		window.removeEventListener('drop', this.dropHandler);
		this.dropHandler = null;
		window.removeEventListener('dragover', this.dragOverHandler);
		this.dragOverHandler = null;
		window.removeEventListener('dragenter', this.dragEnterHandler);
		this.dragEnterHandler = null;
		window.removeEventListener('dragleave', this.dragLeaveHandler);
		this.dragLeaveHandler = null;
		window.removeEventListener('dragend', this.dragEndHandler);
		this.dragEndHandler = null;
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
					<label className='pa3 bn ttu pointer bg-black-10 dim' onClick={()=>{$('[name="imageFile"]').click();}}>Select File</label>
					<input type='file' name='imageFile' className='w-100 pa3 mv2' style={{display: 'none'}} accept="image/*"
						onChange={this.onFileSelected.bind(this)}
						onClick={(event)=> { 
							event.target.value = null;
						}}
					/>
					{ this.state.isDraggingFile &&
						<div className='w-100 dropToUpload'>Drop to Upload</div>
					}
					{ (this.state.imageUrl || !this.state.isDraggingFile) &&
						<div className='imegaPreview w-100'>
							{this.state.imageUrl && 
								<img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
							}
							{!this.state.imageUrl && !this.state.isLoadingFile && 
								<span>Kein Bild ausgewählt.</span>
							}
							{!this.state.imageUrl && this.state.isLoadingFile && 
								<span>Processing File...</span>
							}
						</div>
					}
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
	
	onFileSelected(event) {
		if(event.target.files.length >= 1) {
			var file = event.target.files[0];
			this.handleFileSelect(file);
		}
	}
	handleFileSelect(file) {
		this.setState({'file': file});
		if(file != null) {
			var reader = new FileReader();
			
			this.setState({imageUrl: ""});
			this.setState({isLoadingFile: true});
			// TODO: handle errors
			reader.addEventListener("load", () => {
				this.setState({imageUrl: reader.result});
				this.setState({isLoadingFile: false});
			}, false);
			
			reader.readAsDataURL(file);
		} else {
			this.setState({imageUrl: ''});
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
