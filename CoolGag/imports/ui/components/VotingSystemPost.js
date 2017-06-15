import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {FormGroup, Input, Button, } from 'reactstrap'

class VotingSystemPost extends React.Component{
	static propTypes = {
	   	data: PropTypes.shape({
	        loading: React.PropTypes.bool,
	        error: React.PropTypes.object,
	        post: React.PropTypes.object,
	        user: React.PropTypes.object,
	    }),
	}

	state = {
	    update: false,
  	}

	handleUpvote = () => {

	    const userId = this.props.user.id
	    const postId = this.props.post.id
	    this.props.upvotePostMutation({
	      mutation: upvotePost,
	      variables: { postId, userId }
	    }).then(({ data }) => {
	    	this.setState({ 'update': true });
	        console.log('got data', data);
	      }).catch((error) => {
	        console.log('there was an error sending the query', error);
	      });
   }

	handleDownvote = () => {
	    const userId = this.props.user.id
	    const postId = this.props.post.id
	    this.props.downvotePostMutation({
	      mutation: downvotePost,
	      variables: { postId, userId }
	    }).then(({ data }) => {
	    	this.setState({ update: true });
	        console.log('got data', data);
	      }).catch((error) => {
	        console.log('there was an error sending the query', error);
	      });
	   }

	render(){
		console.log(this.props);

		if (this.props.data.loading) {
  			return (<div>Loading</div>)
		}

    	if (this.props.data.error) {
      		console.log(this.props.data.error)
      		return (<div>An unexpected error occurred</div>)
		}

     	const comments = this.props.post.comments;
     	const countComments = this.props.data.Post._commentsMeta.count;
	     // TODO: _usersWhoUpvotedMeta is not defined. Why? comments where defined...is it coming from parent PostPage
	    const countUpvotes = this.props.data.Post._usersWhoUpvotedMeta.count;
	    const countDownvotes = this.props.data.Post._usersWhoDownvotedMeta.count;


	   	return(
	   		<div>
				<div>
					<span>
		      			<Button className="upvote-btn"  onClick= { this.handleUpvote }><span className="glyphicon glyphicon-thumbs-up"></span>UP</Button>{' '}
		        	</span>
		        	<span>
		     	 		<Button className="downvote-btn"  onClick={ this.handleDownvote }><span className="glyphicon glyphicon-thumbs-down"></span>DOWN</Button>{' '}
		        	</span>
	        	</div>
	        	<div className="points-post">
				    <span>
				        upvotes: { countUpvotes }&nbsp;
				    </span>
				    <span> | </span>
				    <span>
				        downvotes: { countDownvotes }&nbsp;
				    </span>
				    <span> | </span>
				    <span>
				        comments: { countComments }&nbsp;
				    </span>
		         </div>
			</div>
	   		)
	   }
}

// Mutations
const downvotePost = gql`
 	mutation addToUserDownvotedPost($userId: ID!, $postId: ID!) {
  		addToUserDownvotedPost(usersWhoDownvotedUserId: $userId, downvotedPostPostId: $postId) {
   			usersWhoDownvotedUser {
		      	id
		      	name
    		}
  		}
}`

const upvotePost = gql`
 	mutation addToUserUpvotedPost($userId: ID!, $postId: ID!) {
  		addToUserUpvotedPost(usersWhoUpvotedUserId: $userId, upvotedPostsPostId: $postId) {
    		usersWhoUpvotedUser {
		      	id
		      	name
   			}
  		}
}`

const countQuery = gql`
query countQuery($id: ID!){
	Post(id: $id){
	    id
	    _usersWhoDownvotedMeta{
	      	count
	    }
	    _usersWhoUpvotedMeta{
	        count
	    }
	    _commentsMeta{
	        count 
	    }
	  }
}`

export default compose(
    graphql(upvotePost, {name : 'upvotePostMutation'}),
    graphql(downvotePost,{ name : 'downvotePostMutation'}),
    graphql(countQuery, {
      options: (ownProps) => ({
          variables: {
            id: ownProps.post.id,
          }
        })
      })
    )(VotingSystemPost)