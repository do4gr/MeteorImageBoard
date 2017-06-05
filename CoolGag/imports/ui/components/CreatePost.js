import React from 'react';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {Button} from 'reactstrap';

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
		dragMightEnded: false,
		isLoadingFile: false,
		userId: ''
	}

	isSubmittable() {
		return this.state.description && this.state.file && !this.state.isSubmitting;
	}

	onDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		this.setState({'dragMightEnded': false});
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
		this.setState({'dragMightEnded': false});
		this.setState({'isDraggingFile': true});
		return false;
	}
	onDragEnter(event) {
		if(event.target == document) {
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	}
	onDragLeave(event) {
		if(event.target == document.body || event.target == document.body.parentElement) {
			event.stopPropagation();
			event.preventDefault();
			this.setState({'isDraggingFile': false});
			return false;
		} else {
			this.setState({'dragMightEnded': true});
			window.setTimeout(() => {
				if(this.state.dragMightEnded) {
					this.setState({'dragMightEnded': false});
					this.setState({'isDraggingFile': false});
				}
			}, 0);
		}
	}
	onMouseLeftWindow(event) {
		if(event.target == document) {
			//console.log("stop dragging!");
			//this.setState({'isDraggingFile': false});
		}
	}
	dropHandler = null;
	dragOverHandler = null;
	dragEnterHandler = null;
	dragLeaveHandler = null;
	mouseLeftWindowHandler = null;
	componentDidMount() {
		this.dropHandler = (event) => {return this.onDrop(event);};
		document.addEventListener('drop', this.dropHandler);
		this.dragOverHandler = (event) => {return this.onDragOver(event);};
		document.addEventListener('dragover', this.dragOverHandler);
		this.dragEnterHandler = (event) => {return this.onDragEnter(event);};
		document.addEventListener('dragenter', this.dragEnterHandler);
		this.dragLeaveHandler = (event) => {return this.onDragLeave(event);};
		document.addEventListener('dragleave', this.dragLeaveHandler);
		this.mouseLeftWindowHandler = (event) => {return this.onMouseLeftWindow(event);};
		document.addEventListener('mouseleave', this.mouseLeftWindowHandler, true);
	}
	componentWillUnmount() {
		document.removeEventListener('drop', this.dropHandler);
		this.dropHandler = null;
		document.removeEventListener('dragover', this.dragOverHandler);
		this.dragOverHandler = null;
		document.removeEventListener('dragenter', this.dragEnterHandler);
		this.dragEnterHandler = null;
		document.removeEventListener('dragleave', this.dragLeaveHandler);
		this.dragLeaveHandler = null;
		document.removeEventListener('mouseleave', this.mouseLeftWindowHandler);
		this.mouseLeftWindowHandler = null;
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
					{ !this.state.imageUrl &&
						<div className='w-100 dropzone mv3'>
							{ !this.state.isLoadingFile && !this.state.isDraggingFile &&
								<span>Kein Bild ausgewählt.</span>
							}
							{ this.state.isLoadingFile &&
								<span>Processing File...</span>
							}
							{ this.state.isDraggingFile &&
								<span>Drop to Upload</span>
							}
					</div>
					}
					{ this.state.imageUrl &&
						<div className={'imagePreviewCotnainer w-100 mv3' + (this.state.isDraggingFile ? ' isDragging' : '')}>
							<img src={this.state.imageUrl} role='presentation' className='w-100 imagePreview' />
							{ (this.state.isDraggingFile || this.state.isLoadingFile) &&
								<div className='w-100 dropzone'>
									{ this.state.isDraggingFile &&
										<span>Drop to Upload</span>
									}
									{ this.state.isLoadingFile &&
										<span>Processing File...</span>
									}
								</div>
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
				this.setState({userId: this.props.data.user.id});
				const {description, category, postedFileId, userId} = this.state
				this.props.mutate({variables: {description, postedFileId, category, userId}})
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
	mutation ($description: String!, $category: POST_CATEGORY!, $postedFileId: ID!, $userId: ID!) {
		createPost(
			description: $description,
			postedFileId: $postedFileId,
			category: $category,
			userId: $userId) {
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
  graphql(userQuery, { options: { forceFetch: true }} )
)(withRouter(CreatePost))


// export default graphql(createPost)(
// 	graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
// )
