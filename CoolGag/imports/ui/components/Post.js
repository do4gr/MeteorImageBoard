import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import PostTitle from './Posts/PostTitle';

export default class Post extends React.Component {
	
	static propTypes = {
		post: PropTypes.object,
	}
	
	render () {
		return (
			<div className='list-container'>
				<div className='pb3'>
					<PostTitle title={this.props.post.description} />
					&nbsp;
				</div>
				<Link to={`/view/${this.props.post.id}`}>
					<img src={this.props.post.postedFile.url} className='w-100' />
				</Link>
				{ this.props.post.category &&
					<div className='pt3'>
						{this.props.post.category}&nbsp;
					</div>
				}
				<span>
					<Button className="upvote-btn"  onClick=""><span className="glyphicon glyphicon-thumbs-up"></span>UP</Button>{' '}
				</span>
				<span>
					<Button className="downvote-btn"  onClick=""><span className="glyphicon glyphicon-thumbs-down"></span>DOWN</Button>
				</span>
			</div>
		)
	}
}
