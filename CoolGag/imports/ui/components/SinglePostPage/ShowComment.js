import React from 'react'
import PropTypes from 'prop-types'
import CommentList from 'react-uikit-comment-list'
import { Link } from 'react-router';
import Comment from 'react-uikit-comment'
import { Media } from 'reactstrap'
import VotingSystemComment from './VotingSystemComment';

export default class ShowComment extends React.Component {

	static propTypes = {
		comment: PropTypes.object.isRequired,
  }

  render(){
  	console.log(this.props)
  	return(
			<div className='comment-container' >
				<Comment>
					<Media left href="#">
						<Media object src={`${this.props.comment.user.profilePic? this.props.comment.user.profilePic.url : '/images/ProfileDummy.png'}`} alt="Generic placeholder image" style={{width:'40px'}}/>
					</Media>
					<span className="profile-comment-link">
						<Link to={`/myposts/`} className="profile-comment-link">
							<h6 className="commentAuthor" >
								{this.props.comment.user.name}
							</h6>
						</Link>
	        		</span>
			        <p> {this.props.comment.text} </p>
		           	<VotingSystemComment comment={ this.props.comment }/>
		         </Comment>
		    <hr/>
		</div>
  	)
  }
}
