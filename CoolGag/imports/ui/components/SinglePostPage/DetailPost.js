import React from 'react'
import {Link} from 'react-router';
import {gql, graphql, compose, fetchPolicy} from 'react-apollo'
import PropTypes from 'prop-types';
import CommentList from 'react-uikit-comment-list'
import {Form, FormGroup, Input, Button} from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';
import ShowComment from './ShowComment'
import VotingSystemPost from '/imports/ui/components/VotingSystemPost';
import {CountPostQuery} from '/imports/ui/containers/CountPostQuery';
import {PostQuery} from './PostPage'


class DetailPost extends React.Component {

  static propTypes = {
    data: PropTypes.shape({loading: React.PropTypes.bool, error: React.PropTypes.object, Post: React.PropTypes.object, user: React.PropTypes.object}).isRequired
  }

  state = {
    text: ''
  }

  handleComment = async() => {
    const userId = this.props.user.id
    const postId = this.props.post.id
    const text = this.state.text
    this.props.createCommentMutation({
      variables: {
        userId,
        postId,
        text
      },
      refetchQueries: [
        {
          query: PostQuery,
          variables: {
            postId
          }
        },
        { 
          query: CountPostQuery,
          variables: { id: postId } 
        }
      ]
    }).then(({data}) => {
      this.setState({text : ''})
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  isSubmittable() {
    if (this.state.text != '') {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (
        <div>An unexpected error occurred</div>
      )
    }

    const comments = this.props.post.comments;
    return (
      <div className="detailPost-view">
        <Container className="nested">
          <Row>
            <Col xs="12">
              <div className='pt3'>
                Description: {this.props.post.description
                  ? this.props.post.description
                  : "-"}&nbsp;
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div >
                <img src={`${this.props.post.postedFile.url}`} className="post-img w-100"/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <VotingSystemPost post={this.props.post} user={this.props.user}/>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div className='pt3'>
                <b>Comments</b>
              </div>
              <hr className="hr-comment"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} placeholder="write comments..." type="textarea" id="comment-form" className="w-100"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="pull-right">
                <button type="submit" disabled={this.isSubmittable()
                  ? ''
                  : 'disabled'} onClick={this.handleComment} className="pa2 bn ttu dim pointer comment-submit-btn ">
                  Add Comment
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='commentList'>
                {comments.map((comment) => 
                  <ShowComment key={comment.id} comment={comment}/>)}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// Mutations
const createComment = gql `
  mutation createComment($userId: ID!, $postId: ID!, $text: String!) {
    createComment(
      userId: $userId,
      postId: $postId,
      text: $text) {
        id
      }
 }
 `
// Queries
const userQuery = gql `
 	query userQuery{
 		user {
 			id
 		}
 	}
 `

export default compose(graphql(createComment, {name: 'createCommentMutation'}), graphql(userQuery),)(DetailPost)
