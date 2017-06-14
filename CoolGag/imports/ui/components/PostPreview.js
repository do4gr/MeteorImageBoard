import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import gql from 'graphql-tag'
import PostTitle from './Posts/PostTitle'
import { graphql, compose } from 'react-apollo'


class PostPreview extends React.Component {

	static propTypes = {
		post: PropTypes.object,
		data: PropTypes.object,
	}

	render () {
		return (
			<div className='list-container'>
				<div className='pb3'>
							<PostTitle title={this.props.post.description} /> &nbsp;
				</div>
				<div className="post-img">
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
	           Author: {this.props.post.user ? this.props.post.user.name: "unknown user"}&nbsp;
	        </span>
			<div className="comments-points">
		        <span>
		         	points: {this.props.post.upvotes ? this.props.post.upvotes: "0"}&nbsp;
		        </span>
		        <span> | </span>
		        <span>
		         	comments: {this.props.post.upvotes ? this.props.post.upvotes: "0"}&nbsp;
		        </span>
         	</div>
			<span>
          		<Button className="upvote-btn"  onClick= {()=>{}}><span className="glyphicon glyphicon-thumbs-up"></span>UP</Button>{' '}
        	</span>
        	<span>
         	 	<Button className="downvote-btn"  onClick= {()=>{}}><span className="glyphicon glyphicon-thumbs-down"></span>DOWN</Button>{' '}
        	</span>
        	<span>
        		<Link to={`/view/${this.props.post.id}`}>
						<Button className="comment-btn"  onClick= {()=>{}}><span className="glyphicon glyphicon-thumbs-down"></span>COMMENT</Button>
				</Link>
        	</span>
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
