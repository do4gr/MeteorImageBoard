import React from "react";
import { gql, graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormGroup, Input, Button } from "reactstrap";
import update from "immutability-helper";
import {Container, Row, Col} from 'reactstrap';

class VotingSystemPost extends React.Component {
	static propTypes = {
		// upvotePost: PropTypes.func.isRequired;
		data: PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			post: React.PropTypes.object,
			user: React.PropTypes.object
		}).isRequired
	};

	handleUpvote = () => {
		const userId = this.props.user.id;
		const postId = this.props.post.id;
		this.props
			.upvotePostMutation({
				variables: { postId, userId },
				refetchQueries: [{
		      	 	query: countQuery,
		      	 	variables: { id: postId }
		      	}],

				// optimisticResponse: {
				//   __typename: 'Mutation',
				//   addToUserUpvotedPost: {
				//   	usersWhoUpvoted: {
				//      __typename: 'User',
				//      id: userId,
				//     },
				//   },
				// },
				// update: (store, { data: { addToUserUpvotedPost } }) => {
				//   // Read the data from our cache for this query.
				//   const data = store.readQuery({ query: countQuery });
				//   // Add our comment from the mutation to the end.
				//   data.usersWhoUpvotedUser.push(addToUserUpvotedPost);
				//   // Write our data back to the cache.
				//   store.writeQuery({ query: countQuery, data });
				// },
			})
			.then(({ data }) => {
			//	console.log("got data", data);
			})
			.catch(error => {
				console.log("there was an error sending the query", error);
			});
	};

	handleDownvote = () => {
		const userId = this.props.user.id;
		const postId = this.props.post.id;
		this.props
			.downvotePostMutation({
				mutation: downvotePost,
				variables: { postId, userId },
				refetchQueries: [{
		      	 	query: countQuery,
		      	 	variables: { id: postId }
		      	}],
			})
			.then(({ data }) => {

				console.log("got data", data);
			})
			.catch(error => {
				console.log("there was an error sending the query", error);
			});
	};

	render() {
		//console.log(this.props);

		if (this.props.data.loading) {
			return <div>Loading</div>;
		}

		if (this.props.data.error) {
			console.log(this.props.data.error);
			return <div>An unexpected error occurred</div>;
		}

		const comments = this.props.post.comments;
		const countComments = this.props.data.Post._commentsMeta.count;
		const countUpvotes = this.props.data.Post._usersWhoUpvotedMeta.count;
		const countDownvotes = this.props.data.Post._usersWhoDownvotedMeta.count;

		return (
			<div>
				<Container className="nested">
					<Row>
						<Col sm="12">
							<div>
								<span>
									<Button
										className="upvote-btn"
										onClick={this.handleUpvote}
									>
										<span className="glyphicon glyphicon-thumbs-up" />UP
									</Button>
									{" "}
								</span>
								<span>
									<Button
										className="downvote-btn"
										onClick={this.handleDownvote}
									>
										<span className="glyphicon glyphicon-thumbs-down" />DOWN
									</Button>
									{" "}
								</span>
							</div>
						</Col>
					</Row>
					<Row className="points-post">
						<Col xs="auto" >
							<span>
								upvotes: {countUpvotes}&nbsp;
							</span>

							<span> |&nbsp; </span>
						</Col>
						<Col xs="auto">
							<span>
								downvotes: {countDownvotes}&nbsp;
							</span>
							<span> |&nbsp; </span>
						</Col>
						<Col xs="auto">
							<span>
								comments: {countComments}&nbsp;
							</span>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

// Mutations
const downvotePost = gql`
 	mutation addToUserDownvotedPost($userId: ID!, $postId: ID!) {
  		addToUserDownvotedPost(usersWhoDownvotedUserId: $userId, downvotedPostsPostId: $postId) {
   			usersWhoDownvotedUser {
		      	id
		      	name
    		}
  		}
}`;

const upvotePost = gql`
 	mutation addToUserUpvotedPost($userId: ID!, $postId: ID!) {
  		addToUserUpvotedPost(usersWhoUpvotedUserId: $userId, upvotedPostsPostId: $postId) {
    		usersWhoUpvotedUser {
		      	id
		      	name
   			}
  		}
}`;

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
	}`;

export default compose(
	graphql(upvotePost, { name: "upvotePostMutation" }),
	graphql(downvotePost, {
		name: "downvotePostMutation"
		// 	options:{
		// 		 update: (proxy, { data: { addToUserUpvotedPost } }) => {
		// const data = proxy.readQuery({ query: countQuery });
		// data.usersWhoUpvoted.push(addToUserUpvotedPost);
		// proxy.writeQuery({ query: countQuery , data });
		// 		},
		// 	},
	}),
	graphql(countQuery, {
		options: ownProps => ({
			variables: {
				id: ownProps.post.id
			}
		})
	})
)(VotingSystemPost);
