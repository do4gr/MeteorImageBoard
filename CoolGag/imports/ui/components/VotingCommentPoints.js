import React from "react";
import { gql, graphql } from "react-apollo";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Input, Button } from "reactstrap";
import update from "immutability-helper";
import {Container, Row, Col} from 'reactstrap';
import moment from 'moment';


class VotingCommentPoints extends React.Component{
	static propTypes = {
		// upvotePost: PropTypes.func.isRequired;
		data: PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			post: React.PropTypes.object,
			user: React.PropTypes.object
		}).isRequired
	};

	render(){

		if (this.props.data.loading) {
			return <div>Loading</div>;
		}

		if (this.props.data.error) {
			console.log(this.props.data.error);
			return <div>An unexpected error occurred</div>;
		}

		const countComments = this.props.data.Post._commentsMeta.count;
		const countUpvotes = this.props.data.Post._usersWhoUpvotedMeta.count;
		const countDownvotes = this.props.data.Post._usersWhoDownvotedMeta.count;
		const from = moment(this.props.data.Post.createdAt).format("MMM Do YY");

		return(
			<div>
				<Container className="nested">
					<Row className="points-post">
						<Col  xs="auto" className="karma-points">
							<span className="karma-list-view">
								karma:&nbsp;
								{this.props.post.	karmaPoints
									? this.props.post.karmaPoints
									: 0}&nbsp;
							</span>
							<span className="karma-list-view">|&nbsp;</span>
						</Col>
						<Col xs="auto" >
							<span>
								up: {countUpvotes}&nbsp;
							</span>

							<span>|&nbsp;</span>
						</Col>
						<Col xs="auto">
							<span>
								down: {countDownvotes}&nbsp;
							</span>
							<span className="comment-points">|&nbsp;</span>
						</Col>
						<Col xs="auto" >
							<span className="comment-points">
								comments: {countComments}&nbsp;
							</span>
							<span className="time-created">|&nbsp;</span>
						</Col>
						<Col xs="auto">
							<span className="time-created">
								on: {from}&nbsp;
							</span>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

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
				createdAt
		  }
	}`;

export default graphql(countQuery, {
		options: ownProps => ({
			variables: {
				id: ownProps.post.id
			}
		})
	})(VotingCommentPoints);
