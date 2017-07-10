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
import MyGroupsQuery from '/imports/ui/components/groups/MyGroupsList';

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
					this.setState({picFileId: result.id});
					var {picFileId, name} = this.state;
					this.props.createGroup({
						variables: {
							picFileId: picFileId,
							userId: this.props.data.user.id ,
							adminId: this.props.data.user.id,
							name: name
						},
						refetchQueries: [{
              				query: MyGroupsQuery,
            			}],
					});

					this.setState({'isSubmitting': false});
					this.props.router.replace('/mygroups/')

				});
			}).catch((exception) => {
				// TODO: handle upload error

				this.setState({'isSubmitting': false});
				this.props.router.replace('/createGroup/')
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
						<Button className="btn-red" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Select Group Picture</Button>
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

										<Button type="cancel" disabled={(!this.isSubmittable())} onClick={this.cancelEditPicture.bind(this)} className={'pa3 bn ttu pointer' + (this.state.isSubmitting ? " black-30 bg-black-05 disabled" : " bg-black-10 dim" )}>
											Cancel
										</Button>{" "}
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
					<Button type="submit" disabled={(!this.isSubmittable())} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")}>
								{this.state.isSubmitting ? (this.state.isRendering ? 'Rendering...' : 'Submitting ...') : 'Submit'}
					</Button>
				</form>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

}


const createGroup = gql`
	mutation createGroup($name: String!, $userId: [ID!], $adminId: ID!, $picFileId: ID!){
		createGroup(
			name: $name,
			usersIds: $userId,
			adminsId: $adminId,
			picFileId: $picFileId
		){
			id
		}
	}
`

export default compose(

	graphql(createGroup, { name: 'createGroup' }),
	graphql(UserQuery, {fetchPolicy: 'network-only'})
	)(withApollo(withRouter(CreateGroup)))
