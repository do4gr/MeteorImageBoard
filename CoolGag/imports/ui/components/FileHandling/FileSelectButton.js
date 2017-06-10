import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class FileSelectButton extends React.Component {
	static propTypes = {
		onSelect: PropTypes.func,
		multiSelect: PropTypes.bool
	}
	
	render() {
		return (
			<button type="button" className='pa3 bn ttu pointer bg-black-10 dim' onClick={()=>{$(ReactDOM.findDOMNode(this)).find('[name="imageFile"]').click();}}>
				{ this.props.label &&
					<span>{this.props.label}</span>
				}
				{ !this.props.label &&
					<span>Select File</span>
				}
				{ !this.props.multiSelect &&
					<input type='file' name='imageFile' className='w-100 pa3 mv2' style={{display: 'none'}} accept="image/*"
						onChange={this.filesSelected.bind(this)}
						onClick={(event)=> {
							event.target.value = null;
						}}
					/>
				}
				{ this.props.multiSelect &&
					<input type='file' name='imageFile' className='w-100 pa3 mv2' style={{display: 'none'}} accept="image/*"
						onChange={this.filesSelected.bind(this)}
						onClick={(event)=> {
							event.target.value = null;
						}}
						multiple='multiple'
					/>
				}
			</button>
		);
	}
	
	filesSelected(event) {
		if(typeof this.props.onSelect == 'function') {
			var files = event.target.files;
			if(this.props.multiSelect) {
				this.props.onSelect(files);
			} else {
				this.props.onSelect(files.length >= 1 ? files[0] : null);
			}
		}
	}
}

