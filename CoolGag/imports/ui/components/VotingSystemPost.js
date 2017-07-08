import React from "react";
import { gql, graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormGroup, Input, Button } from "reactstrap";
import update from "immutability-helper";
import {Container, Row, Col} from 'reactstrap';
import { Glyphicon } from 'react-bootstrap';
import {CountPostQuery} from '/imports/ui/containers/CountPostQuery';
import VotingCommentPoints from '/imports/ui/components/VotingCommentPoints';

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

		const karmaPoints = this.props.post.karmaPoints ? this.props.post.karmaPoints : 0;
		const dummy = "upvote";

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

			this.props
	.updatePost({
		mutation: updatePost,
		variables: { postId, dummy, userId, karmaPoints},
	})
	.then(({ data }) => {

		console.log("got update", data);
	})
	.catch(error => {
		console.log("there was an error sending the update", error);
	});

	};

	handleDownvote = () => {
		const userId = this.props.user.id;
		const postId = this.props.post.id;
		const karmaPoints = this.props.post.karmaPoints ? this.props.post.karmaPoints : 0;
		const dummy = "downvote";

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

			this.props
				.updatePost({
					mutation: updatePost,
					variables: { postId, dummy, userId, karmaPoints},
				})
				.then(({ data }) => {

					console.log("got update", data);
				})
				.catch(error => {
					console.log("there was an error sending the update", error);
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
						<Col xs="12" sm="5">
							<div>
								<span>
									<Button
										className="upvote-btn"
										onClick={this.handleUpvote}
									>
										<Glyphicon glyph="arrow-up"/>
									</Button>
									{" "}
								</span>
								<span>
									<Button
										className="downvote-btn"
										onClick={this.handleDownvote}
									>
										<Glyphicon glyph="arrow-down"/>
									</Button>
									{" "}
								</span>
								<span>
									<Link to={`/view/${this.props.post.id}`}>
										<Button className="comment-btn"  onClick= {()=>{}}><Glyphicon glyph="comment" /></Button>{" "}
									</Link>
								</span>
							</div>
						</Col>
						<Col  sm="3">
							<span className="karma-list-view">
								Karma:&nbsp;
												{this.props.post.karmaPoints
													? this.props.post.karmaPoints
													: 0}&nbsp;
							</span>
						</Col>
					    <Col xs="12" sm="4" >
					        <div className='pull-right author-tag'>
					            Author:&nbsp;
					            <Link to={`/publicProfile/${this.props.post.user.id}`} className="profile-post-link">
				                    {this.props.post.user
				                      ? this.props.post.user.name
				                      : "deleted user"}&nbsp;
				                 </Link>
					        </div>
						</Col>
					</Row>
					<Row>
			        	<Col xs="12" className="pt-2">
			        		<VotingCommentPoints data={this.props.data} post={ this.props.post } user={ this.props.data.user } />
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

const updatePost = gql`
	mutation updatePost($postId: ID!, $dummy: String!, $userId: ID!, $karmaPoints: Int!){
		updatePost(id: $postId, dummy: $dummy, userId: $userId, karmaPoints: $karmaPoints){
			id
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
		graphql(updatePost, { name: "updatePost" }),
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
