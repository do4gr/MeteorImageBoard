import React from 'react'
import { gql, graphql, compose, withApollo } from 'react-apollo'
import { withRouter, Redirect } from 'react-router'
import { Button, ButtonGroup, Col, Row } from 'reactstrap'
import NavPersonalLists from './NavPersonalLists'
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import FileSelectButton from './../FileHandling/FileSelectButton';
import WindowDropZone from './../FileHandling/WindowDropZone';
import FileHandling from './../FileHandling/FileHandling';
import PredefinedMemeSelect from './../PredefinedMemeSelect';
import MyPosts from './../../containers/profileLists/MyPosts';
import moment from 'moment';


class ProfileHeader extends React.Component {

	static propTypes = {
		router: PropTypes.object,
		mutate: PropTypes.func,
		data: PropTypes.object
	};

	state = {
		imageUrl: '',
		imageSize: {width: 0, height: 0},
		isSubmitting: false,
		isRendering: false,
		file: null,
		postedFileId: '',
		isDraggingFile: false,
		isValidType: true,
		isLoadingFile: false,
		isEditingPicture: false,
	}

	render() {

		 if (this.props.data.loading) {
			return (<div>Loading</div>)
		}
		// redirect if no user is logged in
		if (!this.props.data.user) {
			console.warn('Only logged in users can watch their profile.');
			this.props.router.replace('/');
		}

		return (
			<container>
			<div className="center-text">
			<Row>
			<Col xs={3} md={1} />
			<Col xs={10} md={6}>
				<h1 className="profileName"> {this.props.data.user.name}</h1>
				{this.props.data.user.profilePic && this.props.data.user.profilePic.url &&
					<div className="profileImage">
						<img src={this.props.data.user.profilePic.url} crossOrigin='Anonymous' role='presentation' className='w-100 profilePic' onError={this.onProfileImageLoadError.bind(this)} />
					</div>
				}
				{!(this.props.data.user.profilePic && this.props.data.user.profilePic.url) &&
					<div className="defaultImage">
						<span>
							<div className="ínput-center">
								<input className="pa3 bn ttu pointer bg-black-10 dim" type="button" value="Edit your profile" onClick={this.changeImage.bind(this)} />
							</div>
							<svg width="25%" height="25%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<path d="M65.904,52.834c-4.734,3.725-10.695,5.955-17.172,5.955c-6.316,0-12.146-2.119-16.821-5.68C16.654,55.575,5,68.803,5,84.757 c0,17.711,14.356,6.197,32.065,6.197h25.868C80.643,90.954,95,102.468,95,84.757C95,68.051,82.22,54.333,65.904,52.834z" fill="#5a0000"/>
								<path d="m48.732 55.057c13.285 0 24.092-10.809 24.092-24.095 0-2.1031-0.27084-4.1442-0.77947-6.0902-1.8787-4.3822 8.5763-5.105 5.6621-20.437-4.3832 12.115-12.076 9.1999-13.982 7.68-4.1173-3.2825-9.3298-5.2464-14.993-5.2464-5.5341 0-10.638 1.8757-14.711 5.0247-3.0862 2.4557-10.352 3.617-14.38-7.562-3.0717 14.595 7.1947 15.878 5.7569 20.62-0.49546 1.9222-0.75905 3.9365-0.75905 6.0112 1e-3 13.286 10.809 24.095 24.093 24.095z" fill="#5a0000"/>
								<text x="20" y="72" fill="white" fontSize="7pt">Add an image
									<tspan x="25" y="85">of yourself!</tspan>
								</text>
							</svg>
						</span>
					</div>
				}
				<div>
					Member since {moment(this.props.data.user.createdAt).format("MMM Do YY")}
				</div>
				<div>
					Karma: {this.props.data.user.karma}
				</div>
				</Col>
				<Col xs={3} md={1}>
				<div className="topPadding30">
					<NavPersonalLists />
				</div>
				</Col>
				</Row>
			</div>
			</container>
		);
	}

	onProfileImageLoadError() {
	  this.props.data.user.profilePic = null;
	}

	changeImage() {
		this.props.router.replace('/settings');
	}

}

const profileData = gql`
	{
		user {
			id
			name
			createdAt
			karma
			profilePic {
				id
				url
			}
		}
	}
`
export default graphql(profileData)
(withApollo(withRouter(ProfileHeader)))
