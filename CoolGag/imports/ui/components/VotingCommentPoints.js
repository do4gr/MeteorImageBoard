import React from "react";
import { gql, graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormGroup, Input, Button } from "reactstrap";
import update from "immutability-helper";
import {Container, Row, Col} from 'reactstrap';
import {CountPostQuery} from '/imports/ui/containers/CountPostQuery';
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
		console.log(this.props)

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
				<Container>
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
							<span> |&nbsp; </span>
						</Col>
						<Col xs="auto">
							<span>
								from: {from}&nbsp;
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
