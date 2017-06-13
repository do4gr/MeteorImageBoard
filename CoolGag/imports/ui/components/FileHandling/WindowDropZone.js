import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class WindowDropZone extends React.Component {
	static propTypes = {
		onDrop: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnd: PropTypes.func
	}
	
	state ={
		isDraggingFile: false,
		isValidType: true,
		dragMightEnded: false
	}
	
	render() {
		return null;
	}
	onDrop(event) {
		event.stopPropagation();
		event.preventDefault();
		this.setState({'dragMightEnded': false});
		this.setDraggingState(false);
		if(typeof this.props.onDrop == 'function') {
			this.props.onDrop(event.dataTransfer.files);
		}
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
		this.setState({'dragMightEnded': false, 'isValidType': validType});
		this.setDraggingState(true, validType);
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
			this.setDraggingState(false);
			return false;
		} else {
			this.setState({'dragMightEnded': true});
			window.setTimeout(() => {
				if(this.state.dragMightEnded) {
					this.setState({'dragMightEnded': false});
					this.setDraggingState(false);
				}
			}, 0);
		}
	}
	dropHandler = null;
	dragOverHandler = null;
	dragEnterHandler = null;
	dragLeaveHandler = null;
	componentDidMount() {
		this.dropHandler = (event) => {return this.onDrop(event);};
		document.addEventListener('drop', this.dropHandler);
		this.dragOverHandler = (event) => {return this.onDragOver(event);};
		document.addEventListener('dragover', this.dragOverHandler);
		this.dragEnterHandler = (event) => {return this.onDragEnter(event);};
		document.addEventListener('dragenter', this.dragEnterHandler);
		this.dragLeaveHandler = (event) => {return this.onDragLeave(event);};
		document.addEventListener('dragleave', this.dragLeaveHandler);
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
	
	
	setDraggingState(newValue, validType) {
		if(newValue != this.state.isDraggingFile) {
			this.setState({isDraggingFile: newValue});
			if(newValue) {
				if(typeof this.props.onDragStart == 'function') {
					this.props.onDragStart(validType);
				}
			} else {
				if(typeof this.props.onDragEnd == 'function') {
					this.props.onDragEnd();
				}
			}
		}
	}
}
