import React from 'react'
import { Link } from 'react-router'
import { gql, graphql, compose, fetchPolicy } from 'react-apollo'
import PropTypes from 'prop-types'
import CommentList from 'react-uikit-comment-list'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import { Glyphicon } from 'react-bootstrap'
import ShowCommentAdmin from './ShowCommentAdmin'
import VotingSystemPostAdmin from '../VotingSystemPostAdmin'
import { CountPostQuery } from '../../containers/CountPostQuery'
import { PostQuery } from './PostPage'

class DetailPostAdmin extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Post: React.PropTypes.object,
      user: React.PropTypes.object,
    }).isRequired,
  }

  state = {
    text: '',
  }

  handleComment = async () => {
    const userId = this.props.user.id
    const postId = this.props.post.id
    const text = this.state.text

    const karmaPoints = this.props.post.karmaPoints
      ? this.props.post.karmaPoints
      : 0
    const dummy = 'comment'

    this.props
      .createCommentMutation({
        variables: {
          userId,
          postId,
          text,
        },
        refetchQueries: [
          {
            query: PostQuery,
            variables: {
              postId,
            },
          },
          {
            query: CountPostQuery,
            variables: { id: postId },
          },
        ],
      })
      .then(({ data }) => {
        this.setState({ text: '' })
      })
      .catch(error => {
        console.log('there was an error sending the query', error)
      })

    this.props
      .updatePost({
        mutation: updatePost,
        variables: { postId, dummy, userId, karmaPoints },
      })
      .then(({ data }) => {
        console.log('got update', data)
      })
      .catch(error => {
        console.log('there was an error sending the update', error)
      })
  }

  isSubmittable() {
    if (this.state.text != '') {
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return <div>An unexpected error occurred</div>
    }

    let feedImg = null
    if (this.props.post.youtubeID) {
      feedImg = (
        <iframe
          className="w-100"
          height="431"
          src={`https://www.youtube.com/embed/${this.props.post.youtubeID}`}
          frameBorder="0"
        />
      )
      console.log(feedImg)
    } else {
      feedImg = <img src={this.props.post.postedFile.url} className="w-100" />
    }

    const comments = this.props.post.comments
    return (
      <div className="detailPost-view">
        <Container className="nested">
          <Row>
            <Col xs="12">
              <div className="pt3">
                {this.props.post.description ? (
                  this.props.post.description
                ) : (
                  '-'
                )}&nbsp;
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div>{feedImg}</div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <VotingSystemPostAdmin
                post={this.props.post}
                user={this.props.user}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div className="pt3">
                <b>Comments</b>
              </div>
              <hr className="hr-comment" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                placeholder="write comments..."
                type="textarea"
                id="comment-form"
                className="w-100"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="pull-right">
                <Button
                  type="submit"
                  disabled={!this.isSubmittable()}
                  onClick={this.handleComment}
                  className="btn-normal pa2 bn ttu dim pointer comment-submit-btn "
                >
                  Add Comment
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="commentList">
                {comments.map(comment => (
                  <ShowCommentAdmin key={comment.id} comment={comment} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

// Mutations
const createComment = gql`
  mutation createComment($userId: ID!, $postId: ID!, $text: String!) {
    createComment(userId: $userId, postId: $postId, text: $text) {
      id
    }
  }
`
const updatePost = gql`
  mutation updatePost(
    $postId: ID!
    $dummy: String!
    $userId: ID!
    $karmaPoints: Int!
  ) {
    updatePost(
      id: $postId
      dummy: $dummy
      userId: $userId
      karmaPoints: $karmaPoints
    ) {
      id
    }
  }
`

// Queries
const userQuery = gql`
  query userQuery {
    authenticatedUser {
      id
    }
  }
`

export default compose(
  graphql(createComment, { name: 'createCommentMutation' }),
  graphql(updatePost, { name: 'updatePost' }),
  graphql(userQuery),
)(DetailPostAdmin)
