import React from 'react'
import PropTypes from 'prop-types'
import { Media } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';

export default class ShowContributor extends React.Component {
	
	static propTypes = {
		contributor: PropTypes.object,
  	}

  	render() {
  		//console.log(this.props)
  		return(
			<Col sm="12" md={{ size: 6}} lg={{ size: 4}} xl={{ size: 4}}>
				<span>
					<Media top href="#">
						<Media object className="img-circle" src={`${this.props.contributor.user.profilePic ? this.props.contributor.user.profilePic.url : '/images/icon2.gif'}`} alt="Generic placeholder image" style={{width:'200px', height:'200px'}} />
					</Media>
				</span>
				<h3>{this.props.contributor.user.name}</h3>
				<p>{this.props.contributor.text}</p>
			</Col>

	
  		)
  	} 
}



