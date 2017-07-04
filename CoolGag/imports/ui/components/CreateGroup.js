import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Redirect } from 'react-router';
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo';
import PropTypes from 'prop-types';
import { UserQuery } from '/imports/ui/containers/UserQuery'
import {Container, Row, Col, FormGroup, Input, Button, ButtonGroup, Collapse, CardBlock, Card } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import FileSelectButton from '/imports/ui/components/FileHandling/FileSelectButton';
import WindowDropZone from '/imports/ui/components/FileHandling/WindowDropZone';
import FileHandling from '/imports/ui/components/FileHandling/FileHandling';
import PredefinedMemeSelect from '/imports/ui/components/PredefinedMemeSelect';
import {MyGroupsQuery} from '/imports/ui/components/profile/MyGroupsList';

class CreateGroup extends React.Component{

	static propTypes = {
		router: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}
	state = {
		imageUrl: '',
		name: '',
		imageSize: {width: 0, height: 0},
		isSubmitting: false,
		isRendering: false,
		file: null,
		picFileId: '',
		isDraggingFile: false,
		isValidType: true,
		isLoadingFile: false,
		isEditingPicture: false,
	}

	// const handleSubmit = () => {
	// 	event.preventDefault();
	// }

	onWindowResize(event) {
		this.recalcImageFontSize();
	}
	onWindowResizeHandler = null;
	componentDidMount(a,b,c,d) {
		this.onWindowResizeHandler = (event) => {return this.onWindowResize(event);};
		window.addEventListener('resize', this.onWindowResizeHandler);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResizeHandler);
		this.onWindowResizeHandler = null;
	}

	handleUpload = (event) => {
		event.preventDefault();
		this.setState({'isSubmitting': true});

		var continueUpload = () => {
			fetch('https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl', {
				body: data,
				method: 'POST'
			}).then((response) => {
				response.json().then(result => {
					//this.setState({imageUrl: result.url});
					this.setState({picFileId: result.id});
					this.setState({userId: this.props.data.user.id });
					var {picFileId, userId, name} = this.state;
					this.props.createGroup({
						variables: {
							picFileId: picFileId,
							userId: this.props.data.user.id ,
							adminId: this.props.data.user.id,
							name: name
						},
					});
					this.setState({'isSubmitting': false});
					this.props.router.replace('/mygroups/')
				});	
			}).catch((exception) => {
				// TODO: handle upload error
				this.props.router.replace('/createGroup/')
				this.setState({'isSubmitting': false});
			})
		};

		let data = new FormData();
		data.append('data', this.state.file);
		continueUpload();

		this.setState({'isEditingPicture': false});
		return false;
	}

	startChoosingImage() {
		this.setState({
			isEditingPicture: true
		});
	}

	cancelEditPicture() {
		if(!this.state.isSubmitting) {
			this.setState({
				isEditingPicture: true,
				imageUrl: '',
				imageSize: {width: 0, height: 0},
				file: null,
			});
		}
	}

	onProfileImageLoadError() {
		this.props.data.user.picFile = null;
	}


	isSubmittable() {
		return this.state.file && this.state.imageUrl && !this.state.isSubmitting && this.state.name;
	}


	onDragStart(validType) {
		this.setState({
			isDraggingFile: true,
			isValidType: validType
		});
	}
	onDragEnd() {
		this.setState({
			isDraggingFile: false
		});
	}
	onDropFiles(files) {
		if(files.length >= 1) {
			this.handleFileSelect(files[0]);
		}
	}

	onImageLoadError(event) {
		console.log('error');
		this.setState({'imageUrl': ''});
		this.setState({'file': null});
	}

	onImageLoaded(event) {
		var imageElement = event.nativeEvent.srcElement || event.nativeEvent.originalTarget;
		$('.uncheckedSpelling').attr('spellcheck', 'false');
		this.setState({
			imageSize: {width: imageElement.naturalWidth, height: imageElement.naturalHeight},
			isLoadingFile: false
		});
	}

	handleFileSelect(file) {
		if(file != null) {
			this.setState({
				file: null,
				imageUrl: '',
				isLoadingFile: true,
			});
			FileHandling.getDataUrl(file, (result) => {
				this.setState({
					file: file,
					imageUrl: result,
					isLoadingFile: false
				});
			});
		}
	}

	render () {
		console.log(this.props)
		if (this.props.data.loading) {
	      	return (<div>Loading</div>)
	    }

	    // redirect if no user is logged in
		if (!this.props.data.user) {
			console.warn('Only logged in users can watch their profile.');
			this.props.router.replace('/');
		}

	    if (this.props.data.error) {
		    console.log(this.props.data.error)
		    return (<div>An unexpected error occurred</div>)
		}

		return (
			<div>
				<Container>
				<Row>
					<Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
				<form className={'groupForm'} onSubmit={this.handleUpload.bind(this)}>
				{/*
				<div className="center-text">

				{!this.state.isEditingPicture && this.props.data.user.groupPic && this.props.data.user.picFile.url &&
					<div className="defaultImage changePicture">
						<span>
							<input className="pa3 bn ttu pointer bg-black-10 dim" type="button" value="Update" onClick={this.startChoosingImage.bind(this)} />
							<input className="pa3 bn ttu pointer bg-black-10 dim" type="button" value="Delete" onClick={this.handleDelete.bind(this)} />
						</span>
						<img src={this.props.data.user.picFile.url} crossOrigin='Anonymous' role='presentation' className='w-100 picFile editpicFile' onError={this.onProfileImageLoadError.bind(this)} />
					</div>
				}
				{!this.state.isEditingPicture && !(this.props.data.user.picFile && this.props.data.user.picFile.url) &&
					<div className="defaultImage">
						<div>
							<svg width="20%" height="20%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<path d="M65.904,52.834c-4.734,3.725-10.695,5.955-17.172,5.955c-6.316,0-12.146-2.119-16.821-5.68C16.654,55.575,5,68.803,5,84.757 c0,17.711,14.356,6.197,32.065,6.197h25.868C80.643,90.954,95,102.468,95,84.757C95,68.051,82.22,54.333,65.904,52.834z" fill="#5a0000"/>
								<path d="m48.732 55.057c13.285 0 24.092-10.809 24.092-24.095 0-2.1031-0.27084-4.1442-0.77947-6.0902-1.8787-4.3822 8.5763-5.105 5.6621-20.437-4.3832 12.115-12.076 9.1999-13.982 7.68-4.1173-3.2825-9.3298-5.2464-14.993-5.2464-5.5341 0-10.638 1.8757-14.711 5.0247-3.0862 2.4557-10.352 3.617-14.38-7.562-3.0717 14.595 7.1947 15.878 5.7569 20.62-0.49546 1.9222-0.75905 3.9365-0.75905 6.0112 1e-3 13.286 10.809 24.095 24.093 24.095z" fill="#5a0000"/>
								<text x="20" y="72" fill="white" fontSize="7pt">Add an image
									<tspan x="25" y="85">to your group!</tspan>
								</text>
							</svg>
						</div>
						<div>
							<Button className="pa3 bn ttu pointer bg-black-10 dim" type="button" value="Upload a picture" onClick={this.startChoosingImage.bind(this)}>Add Image</Button>
						</div>
					</div>
				}

				</div>
				*/}
					
						<Button onClick={this.toggle} style={{ marginBottom: '1rem' }}>Select Group Picture</Button>
						<Collapse isOpen={this.state.collapse}>
				          <Card>
				            <CardBlock>
				            	<FormGroup>
									<div>
										<WindowDropZone
											onDragStart={this.onDragStart.bind(this)}
											onDragEnd={this.onDragEnd.bind(this)}
											onDrop={this.onDropFiles.bind(this)}
										/>

										{ !this.state.imageUrl &&
											<div className='w-100 dropzone mv3'>
												{ !this.state.isLoadingFile && !this.state.isDraggingFile &&
													<span>Select a file or drop an image here.</span>
												}
												{ this.state.isLoadingFile &&
													<span>Processing File...</span>
												}
												{ this.state.isDraggingFile && this.state.isValidType &&
													<span>Drop to Upload</span>
												}
												{ this.state.isDraggingFile && !this.state.isValidType &&
													<span>Invalid File</span>
												}
											</div>
										}
										{ this.state.imageUrl &&
											<div className={'imagePreviewCotnainer w-100 mv3' + (this.state.isDraggingFile ? ' isDragging' : '')}>
												<div className={'imagePreview' + (this.state.isTextEntered ? ' textEntered' : '')}>
													<img src={this.state.imageUrl} crossOrigin='Anonymous' role='presentation' className='w-100' onLoad={this.onImageLoaded.bind(this)} onError={this.onImageLoadError.bind(this)} />
												</div>
												{ (this.state.isDraggingFile || this.state.isLoadingFile) &&
													<div className='w-100 dropzone'>
														{ this.state.isDraggingFile && this.state.isValidType &&
															<span>Drop to Upload</span>
														}
														{ this.state.isDraggingFile && !this.state.isValidType &&
															<span>Invalid File</span>
														}
														{ this.state.isLoadingFile &&
															<span>Processing File...</span>
														}
													</div>
												}
											</div>
										}

										<button type="cancel" disabled={(this.state.isEditingPicture ? "" : "disabled")} onClick={this.cancelEditPicture.bind(this)} className={'pa3 bn ttu pointer' + (this.state.isSubmitting ? " black-30 bg-black-05 disabled" : " bg-black-10 dim" )}>
											Cancel
										</button>{" "}
										<FileSelectButton onSelect={this.handleFileSelect.bind(this)} />
										
									</div>
				            	</FormGroup>
				            </CardBlock>
				          </Card>
				        </Collapse>
					
						<FormGroup>
							<Input
							className='w-100 pa3 mv2 group-name'
							value={this.state.name}
							placeholder='Choose a group name'
							onChange={(e) => this.setState({name: e.target.value})}
							/>
						</FormGroup>
					<button type="submit" disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")}>
								{this.state.isSubmitting ? (this.state.isRendering ? 'Rendering...' : 'Submitting ...') : 'Submit'}
					</button>
				</form>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

}

  // createGroup = () => {
  //   const { name, } = this.state

  //   this.props.createUser({variables: {email, password, name, emailSubscription}})
  //     .then((response) => {
  //       this.props.signinUser({variables: {email, password}})
  //         .then((response) => {
  //           window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
  //           this.props.router.replace('/')
  //         }).catch((e) => {
  //           console.error(e)
  //           this.props.router.replace('/')
  //         })
  //     }).catch((e) => {
  //       console.error(e)
  //       this.props.router.replace('/')
  //     })
  // }



// const deletePicture = gql`
// 	mutation ($userId: ID!, $fileId: ID!) {
// 		unsetUserOnFile(
// 			groupPicUserId: $userId,
// 			picFileFileId: $fileId
// 		)
// 		{
// 			groupPicUser {
// 				id
// 			}
// 		}
// 		deleteFile(
// 			id: $fileId
// 		)
// 		{
// 			id
// 		}
// 	}
// `
// const uploadGroupPicture = gql`
// 		mutation ($groupPicId: ID!, $picFileId: ID!) {
// 		setGroupOnFile(
// 			groupPicGroupId: $groupPicId,
// 			picFileFileId: $picFileId
// 		)
// 		{
// 			groupPicGroup {
// 				id
// 			}
// 		}
// 	}
// `


const createGroup = gql`
	mutation createGroup($name: String!, $userId: [ID!], $adminId: ID!, $picFileId: ID!){
		createGroup(
			name: $name,
			usersIds: $userId,
			adminId: $adminId,
			picFileId: $picFileId
		){
			id
		}
	}
`

export default compose(
	graphql(createGroup, { name: 'createGroup' }),
	graphql(UserQuery, fetchPolicy: 'network-only')
	)(withApollo(withRouter(CreateGroup)))






