import React from 'react';
import { withRouter } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {Button} from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import PredefinedMemeSelect from './PredefinedMemeSelect';

class CreatePost extends React.Component {

	static propTypes = {
		router: PropTypes.object,
		mutate: PropTypes.func,
		data: PropTypes.object
	}
	
	static placeholders = {
		upper: 'Enter',
		lower: 'Text'
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
		dragMightEnded: false,
		isLoadingFile: false,
		isTextEntered: false,
		isPredefinedMeme: false,
		userId: '',
		upperImageText: CreatePost.placeholders.upper,
		lowerImageText: CreatePost.placeholders.lower
	}
	
	static fontSizePercentage = 0.09;
	static textStyle = {
		'text-align': 'center',
		'font-family': 'impact',
		'color': 'white',
		'position': 'absolute',
		'width': '100%'
		//'text-shadow': '-0.0625em -0.0625em 0 #000, 0.0625em -0.0625em 0 #000,-0.0625em  0.0625em 0 #000,0.0625em  0.0625em 0 #000,-0.0625em  0em 0 #000,0.0625em  0em 0 #000, 0em 0.0625em 0 #000, 0em -0.0625em 0 #000'
	};
	static upperTextStyle = {
		'top': '0'
	};
	static lowerTextStyle = {
		'bottom': '.25em' // not 0, since thas caused the text to have no gap towards the bottom at all
	};

	isSubmittable() {
		return this.state.description && (this.state.file || this.state.isPredefinedMeme && this.state.imageUrl && this.state.isTextEntered) && !this.state.isSubmitting;
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
		var validType;
		if(event.dataTransfer.types.length == 1 && event.dataTransfer.types[0] == 'Files') {
			event.dataTransfer.dropEffect = 'copy';
			validType = true;
		} else {
			event.dataTransfer.dropEffect = 'none';
			validType = false;
		}
		this.setState({'dragMightEnded': false, 'isValidType': validType, 'isDraggingFile': true});
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
	onWindowResize(event) {
		this.recalcImageFontSize();
	}
	dropHandler = null;
	dragOverHandler = null;
	dragEnterHandler = null;
	dragLeaveHandler = null;
	onWindowResizeHandler = null;
	componentDidMount(a,b,c,d) {
		this.dropHandler = (event) => {return this.onDrop(event);};
		document.addEventListener('drop', this.dropHandler);
		this.dragOverHandler = (event) => {return this.onDragOver(event);};
		document.addEventListener('dragover', this.dragOverHandler);
		this.dragEnterHandler = (event) => {return this.onDragEnter(event);};
		document.addEventListener('dragenter', this.dragEnterHandler);
		this.dragLeaveHandler = (event) => {return this.onDragLeave(event);};
		document.addEventListener('dragleave', this.dragLeaveHandler);
		this.onWindowResizeHandler = (event) => {return this.onWindowResize(event);};
		window.addEventListener('resize', this.onWindowResizeHandler);
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
		window.removeEventListener('resize', this.onWindowResizeHandler);
		this.onWindowResizeHandler = null;
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
				<form style={{ maxWidth: 400 }} className='' onSubmit={(event) => {this.handlePost(event)}}>
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
					<button type="button" className='pa3 bn ttu pointer bg-black-10 dim' onClick={()=>{$('[name="imageFile"]').click();}}>Select File</button>
					&nbsp;
					<button type="button" className='pa3 bn ttu pointer bg-black-10 dim' onClick={this.onSelectMeme.bind(this)}>Select Meme</button>
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
								<ContentEditable
									onFocus={this.onImageTextFocused.bind(this)}
									onBlur={this.onImageTextBlured.bind(this)}
									className={"outlined upper imageText uncheckedSpelling" + (this.state.isTextEntered ? '' : ' placeholder')}
									html={this.state.upperImageText}
									onChange={this.onImageTextChanged.bind(this, 'upperImageText')}></ContentEditable>
								<ContentEditable
									onFocus={this.onImageTextFocused.bind(this)}
									onBlur={this.onImageTextBlured.bind(this)}
									className={"outlined lower imageText uncheckedSpelling" + (this.state.isTextEntered ? '' : ' placeholder')}
									html={this.state.lowerImageText}
									onChange={this.onImageTextChanged.bind(this, 'lowerImageText')}></ContentEditable>
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
					<button type="submit" disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")}>
						{this.state.isSubmitting ? (this.state.isRendering ? 'Rendering...' : 'Submitting ...') : 'Post'}
					</button>
					<Popup
						className = "memeSelectPopup"
						btnClass = "popup__btn"
						closeBtn = {true}
						closeHtml = {null}
						defaultOk = "Ok"
						defaultCancel = "Cancel"
						wildClasses = {false}
						closeOnOutsideClick = {true} />
				</form>
			</div>
		)
	}
	
	recalcImageFontSize(element) {
		if(!element) {
			$(ReactDOM.findDOMNode(this)).find('.imagePreview').each((i, e)=>{
				this.recalcImageFontSize(e);
			});
		} else {
			$(element).css({'font-size': $(element).width() * CreatePost.fontSizePercentage + "px"});
		}
	}

	handlePost = (event) => {
		event.preventDefault();
		this.setState({'isSubmitting': true});
		
		var continueUpload = () => {
			fetch('https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl', {
				body: data,
				method: 'POST'
			}).then((response) => {
				response.json().then(result => {
					//self.setState({imageUrl: result.url});
					this.setState({postedFileId: result.id});
					this.setState({userId: this.props.data.user.id});
					var {description, category, postedFileId, userId} = this.state
					if(category == "") {
						category = null;
					}
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
		};
		
		let data = new FormData();
		if(this.state.isTextEntered) {
			this.generateImage({
				callback: (dataUrl) => {
					var blob = this.dataURItoBlob(dataUrl);
					data.append('data', blob, 'generated.jpeg');
					continueUpload();
				}
			});
		} else {
			data.append('data', this.state.file);
			continueUpload();
		}
    
		return false;
	}

	onImageLoadError(event) {
		console.log('error');
		this.setState({'imageUrl': ''});
		this.setState({'file': null});
	}

	onImageLoaded(event) {
		var imageElement = event.nativeEvent.srcElement;
		this.recalcImageFontSize();
		$('.uncheckedSpelling').attr('spellcheck', 'false');
		this.setState({
			imageSize: {width: imageElement.naturalWidth, height: imageElement.naturalHeight},
			isLoadingFile: false
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
				this.setState({
					imageUrl: reader.result,
					isLoadingFile: false,
					isPredefinedMeme: false
				});
			}, false);
			
			reader.readAsDataURL(file);
		} else {
			this.setState({imageUrl: ''});
		}
	}

	onSelectMeme(event) {
		var onSelect = (meme) => {
			this.setState({
				'isPredefinedMeme': true,
				'isLoadingFile': true,
				'imageUrl': '/imageProxy?imageSecret=' + meme.file.secret
			});
			Popup.close(popupId);
		};
		var popupId = Popup.create({
			title: null,
			content: (<PredefinedMemeSelect onSelect={onSelect} />),
			className: 'alert',
			buttons: {
				right: ['cancel']
			}
		});
	}


	// ContentEditable: https://github.com/lovasoa/react-contenteditable
	onImageTextFocused() {
		if(!this.state.isTextEntered) {
			this.setState({
				upperImageText: '',
				lowerImageText: ''
			});
		}
	}
	onImageTextChanged(stateName, event) {
		if(event.nativeEvent && event.nativeEvent.srcElement) {
			if(typeof event.nativeEvent.srcElement.innerHTML == "string") {
				console.log('onChange');
				var value = event.nativeEvent.srcElement.innerHTML;
				var previousValue = this.state[stateName];
				if(value != previousValue) {
					tmp = {isTextEntered: true};
					tmp[stateName] = event.nativeEvent.srcElement.innerHTML;
					this.setState(tmp);
				}
			}
		}
	}
	onImageTextBlured() {
		if(!this.state.upperImageText && !this.state.lowerImageText) {
			this.setState({
				isTextEntered: false,
				upperImageText: CreatePost.placeholders.upper,
				lowerImageText: CreatePost.placeholders.lower
			});
		}
	}
	styleObjectToString() {
		result = "";
		for(var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			for(var key in arg) {
				result += key + ':' + arg[key] + ';';
			}
		}
		return result;
	}
	
	// Image from DOM: https://developer.mozilla.org/de/docs/Web/HTML/Canvas/Drawing_DOM_objects_into_a_canvas
	generateImage(options) {
		this.setState({'isRendering': true});
		var img = new Image();
		
		img.onload = () => {
			var width = this.state.imageSize.width;
			var height = this.state.imageSize.height;
			var canvas = document.createElement('canvas');
			//var canvas = document.getElementById('generationTest');
			var ctx = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			canvas.style = 'width: ' + 400 + 'px;';
			var fontSize = width * CreatePost.fontSizePercentage;
			
			var blackUpperText;
			var whiteUpperText;
			var blackLowerText;
			var whiteLowerText;
			
			this.drawText({
				html: this.state.upperImageText,
				fontSize: fontSize,
				width: width,
				height: height,
				color: 'black'
			}).then((result)=>{
				blackUpperText = result;
				this.drawText({
					html: this.state.upperImageText,
					fontSize: fontSize,
					width: width,
					height: height,
					color: 'white'
				}).then((result)=>{
					whiteUpperText = result;
					this.drawText({
						html: this.state.lowerImageText,
						fontSize: fontSize,
						width: width,
						height: height,
						color: 'black'
					}).then((result)=>{
						blackLowerText = result;
						this.drawText({
							html: this.state.lowerImageText,
							fontSize: fontSize,
							width: width,
							height: height,
							color: 'white'
						}).then((result)=>{
							whiteLowerText = result;
							
							//ctx.drawImage(blackUpperText, -5, fontSize / 5-5);
							ctx.clearRect(0, 0, canvas.width, canvas.height);
							ctx.drawImage(img, 0, 0);
							var offset = fontSize / 16;
							ctx.drawImage(blackUpperText, -offset, fontSize / 16 - offset);
							ctx.drawImage(blackUpperText, -offset, fontSize / 16);
							ctx.drawImage(blackUpperText, -offset, fontSize / 16 + offset);
							ctx.drawImage(blackUpperText, 0, fontSize / 16 - offset);
							ctx.drawImage(blackUpperText, 0, fontSize / 16 + offset);
							ctx.drawImage(blackUpperText, offset, fontSize / 16 - offset);
							ctx.drawImage(blackUpperText, offset, fontSize / 16);
							ctx.drawImage(blackUpperText, offset, fontSize / 16 + offset);
							ctx.drawImage(whiteUpperText, 0, fontSize / 16);
							
							ctx.drawImage(blackLowerText, -offset, height - blackLowerText.height - offset);
							ctx.drawImage(blackLowerText, -offset, height - blackLowerText.height);
							ctx.drawImage(blackLowerText, -offset, height - blackLowerText.height + offset);
							ctx.drawImage(blackLowerText, 0, height - blackLowerText.height - offset);
							ctx.drawImage(blackLowerText, 0, height - blackLowerText.height + offset);
							ctx.drawImage(blackLowerText, offset, height - blackLowerText.height - offset);
							ctx.drawImage(blackLowerText, offset, height - blackLowerText.height);
							ctx.drawImage(blackLowerText, offset, height - blackLowerText.height + offset);
							ctx.drawImage(whiteLowerText, 0, height - whiteLowerText.height);
							
							var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
							
							this.setState({'isRendering': false});
							if(options && typeof options.callback == 'function') {
								options.callback(dataUrl);
							}
						});
					});
				});
			});
		}
		
		img.src = this.state.imageUrl;
	}
	
	drawText(options) {
		var color = options && options.color ? options.color : 'black';
		var html = options && options.html ? options.html : '';
		var width = options && options.width ? options.width : 400;
		var height = options && options.height ? options.height : 400;
		var fontSize = options && options.fontSize ? options.fontSize : 36;
		var callback = null;
		
		var frame = document.createElement('iframe');
		frame.setAttribute('style', 'position:absolute;top:0;left:0;width:0;height:0;');
		frame.setAttribute('frameBorder','0');
		frame.onload = () => {
			var divContainer = $('<div style="width:' + width +'px; height: ' + height +'px;"></div>')[0];
			var upperStyle = this.styleObjectToString(CreatePost.textStyle, {'font-size': fontSize + 'px', width: width + 'px;', color: color, position: 'relative'});
			var lowerStyle = this.styleObjectToString(CreatePost.textStyle, {'font-size': fontSize + 'px', width: width + 'px;', color: color, position: 'relative'});
			var div = $('<div style="' + upperStyle + '">' + html + '</div>')[0];
			divContainer.appendChild(div);
			frame.contentDocument.body.appendChild(divContainer);
			html2canvas(div, {
				width: width,
				onrendered: (canvas) => {
					frame.contentDocument.body.removeChild(divContainer);
					document.body.removeChild(frame);
					if(callback) {
						callback(canvas);
					}
				}
			});
		};
		
		document.body.appendChild(frame);
		
		return {
			then: (c)=> {
				callback = c;
			}
		};
	}
	
	// used to create submittable content from an image url
	// see: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
	dataURItoBlob(dataURI, options) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		var parts = dataURI.split(',');
		if (parts[0].indexOf('base64') >= 0)
			byteString = atob(parts[1]);
		else
			byteString = unescape(parts[1]);

		// separate out the mime component
		var mimeString = parts[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		console.log('type:', mimeString);
		return new Blob([ia], {type:mimeString});
	}
}

const createPost = gql`
	mutation ($description: String!, $category: POST_CATEGORY, $postedFileId: ID!, $userId: ID!) {
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
