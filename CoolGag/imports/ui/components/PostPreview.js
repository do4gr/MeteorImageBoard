import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import gql from 'graphql-tag'
import PostTitle from './Posts/PostTitle'
import { graphql, compose } from 'react-apollo'
import VotingSystemPost from '/imports/ui/components/VotingSystemPost';


class PostPreview extends React.Component {

	static propTypes = {
		post: PropTypes.object,
		data: PropTypes.object,
	}

	render () {
		return (
			<div>
				<div className='list-container'>
					<div className='pb3'>
							<PostTitle title={this.props.post.description} /> &nbsp;
					</div>
					<div className="feed-img">
						<Link to={`/view/${this.props.post.id}`}>
							<img src={this.props.post.postedFile.url} className='w-100' />
						</Link>
					</div>
					{ this.props.post.category &&
						<div className='pt3'>
							{this.props.post.category}&nbsp;
						</div>
					}
				<span className='author-tag'>
            		Author:
            		<Link to={`/myposts/`} className="profile-post-link">
               			{this.props.post.user ? this.props.post.user.name: "unknown user"}&nbsp;
           			</Link>
         		</span>
	        	<div className="button-wrapper">
	        	<div className="comment-btn-link">
	        		<Link to={`/view/${this.props.post.id}`}>
						<Button className="comment-btn"  onClick= {()=>{}}><span className="glyphicon glyphicon-thumbs-down"></span>COMMENT</Button>
					</Link>
	        	</div>
	        	<VotingSystemPost post={ this.props.post } user={ this.props.data.user } />
	        	</div>
			</div>
			<hr/>
		</div>
		)
	}
}

 const userQuery = gql`
 	query {
 		user {
 			id
 		}
 	}
 `

 export default graphql(userQuery)(PostPreview)
