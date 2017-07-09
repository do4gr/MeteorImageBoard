import React from 'react'
import PropTypes from 'prop-types'
import CommentList from 'react-uikit-comment-list'
import { Link } from 'react-router';
import Comment from 'react-uikit-comment'
import { Media } from 'reactstrap'
import VotingSystemComment from './VotingSystemComment';
import {Container, Row, Col} from 'reactstrap';

export default class ShowComment extends React.Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
  }

  render(){
  	//console.log(this.props)
  	return(
		<div className='comment-container' >
			<Container className="nested">
				<Comment>
				<Row>
					<Col className="align-item">
						<span>
							<Media left href="#">
								<div className="imgHolder">
									<Media className="img-responsive" object src={`${this.props.comment.user.profilePic? this.props.comment.user.profilePic.url : '/images/ProfileDummy.png'}`} alt="Generic placeholder image" style={{width:'40px'}}/>
								</div>
							</Media>
						</span>
						<span className="profile-comment-link commentAuthor">
							<Link to={`/myposts/`} className="profile-comment-link">
									{this.props.comment.user.name}
							</Link>
		        		</span>
					</Col>
				</Row>
				<Row>
					<Col><div> {this.props.comment.text} </div></Col>
				</Row>
				<Row>
					<Col>
						<VotingSystemComment comment={ this.props.comment }/>
					</Col>
				</Row>
				</Comment>
				<hr/>
			</Container>
		</div>
  	)
  }
}
