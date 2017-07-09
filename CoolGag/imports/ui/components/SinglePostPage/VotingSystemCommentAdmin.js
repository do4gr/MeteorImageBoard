import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {FormGroup, Input, Button, } from 'reactstrap'
import {Glyphicon} from 'react-bootstrap'
import {Container, Row, Col} from 'reactstrap';

class VotingSystemCommentAdmin extends React.Component{
	static propTypes = {
	    comment: React.PropTypes.object.isRequired,
	}

	handleUpvote = () => {

	    const userId = this.props.comment.user.id
	    const commentId = this.props.comment.id
	    this.props.upvoteCommentMutation({
	      	mutation: upvoteComment,
	      	variables: { commentId, userId },
	      	refetchQueries: [{
	      	 	query: countQuery,
	      	 	variables: { id: commentId }
	      	}],
	    }).then(({ data }) => {
	    	this.setState({ 'update': true });
	        //console.log('got data', data);
	      }).catch((error) => {
	        console.log('there was an error sending the query', error);
	      });
   }

	handleDownvote = () => {
	    const userId = this.props.comment.user.id
	    const commentId = this.props.comment.id
	    this.props.downvoteCommentMutation({
	      	mutation: downvoteComment,
	      	variables: { commentId, userId },
	      	refetchQueries: [{
	      	 	query: countQuery,
	      	 	variables: { id: commentId }
	      	}],
	    }).then(({ data }) => {
	        //console.log('got data', data);
	      }).catch((error) => {
	        console.log('there was an error sending the query', error);
	      });
	   }

		 handleDelete = () => {
			 const userId = this.props.comment.user.id
	 	    const commentId = this.props.comment.id
	 	    this.props.deleteCommentMutation({
	 	      	mutation: deleteComment,
						variables: { commentId, userId }

	 	    }).then(({ data }) => {
	 	        //console.log('got data', data);
	 	      }).catch((error) => {
	 	        console.log('there was an error sending the query', error);
	 	      });
	 	   }


	render(){
		//console.log(this.props);

		if (this.props.data.loading) {
  			return (<div>Loading</div>)
		}

    	if (this.props.data.error) {
      		console.log(this.props.data.error)
      		return (<div>An unexpected error occurred</div>)
		}

	    const countUpvotes = this.props.data.Comment._usersWhoUpvotedMeta.count;
	    const countDownvotes = this.props.data.Comment._usersWhoDownvotedMeta.count;

	   	return(
	   		<div>
				<Container className="nested">
					<Row>
						<Col>
							<div className="points-comment">
							    <span>
							        upvotes: { countUpvotes }&nbsp;
							    </span>
							    <span> | </span>
							    <span>
							        downvotes: { countDownvotes }&nbsp;
							    </span>

					         </div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div>
								<span>
					      			<Button className="upvote-btn btn-sm"  onClick={this.handleUpvote} >
					      				<Glyphicon glyph="arrow-up"/>
					      			</Button>{' '}
					        	</span>
					        	<span>
					     	 		<Button className="downvote-btn btn-sm"  onClick={ this.handleDownvote }>
					     	 			<Glyphicon glyph="arrow-down"/>
					     	 		</Button>{' '}
					        	</span>
										<span>
										<Button className="trash-btn btn-sm"  onClick={ this.handleDelete }>
											<Glyphicon glyph="trash"/>
										</Button>{' '}
										</span>
				        	</div>
						</Col>
					</Row>
				</Container>
			</div>
	   		)
	   }
}

// Mutations
const downvoteComment = gql`
 	mutation addToUsersDownvotedComment($userId: ID!, $commentId: ID!) {
  		addToUsersDownvotedComment(usersWhoDownvotedUserId: $userId, downvotedCommentCommentId: $commentId) {
   			usersWhoDownvotedUser {
		      	id
		      	name
    		}
  		}
}`

const upvoteComment = gql`
 	mutation addToUsersUpvotedComment($userId: ID!, $commentId: ID!) {
  		addToUsersUpvotedComment(usersWhoUpvotedUserId: $userId, upvotedCommentCommentId: $commentId) {
    		usersWhoUpvotedUser {
		      	id
		      	name
   			}
  		}
}`

const deleteComment = gql`
 	mutation deleteComment($commentId: ID!) {
  		deleteComment(id: $commentId) {
				id
  		}
}`


const countQuery = gql`
query countQuery($id: ID!){
	Comment(id: $id){
	    id
	    _usersWhoDownvotedMeta{
	      	count
	    }
	    _usersWhoUpvotedMeta{
	        count
	    }
	}
}`

export default compose(
    graphql(upvoteComment, {name : 'upvoteCommentMutation'}),
    graphql(downvoteComment,{ name : 'downvoteCommentMutation'}),
		graphql(deleteComment,{ name : 'deleteCommentMutation'}),
    graphql(countQuery, {
      options: (ownProps) => ({
          variables: {
            id: ownProps.comment.id,
          }
        })
      }),
    )(VotingSystemCommentAdmin)
