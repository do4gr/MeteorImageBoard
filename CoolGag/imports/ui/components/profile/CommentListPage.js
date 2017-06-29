import React from 'react'
import PostPreview from '../PostPreview'
import { gql,graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';
import moment from 'moment';


export default class CommentListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
        <div>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }} className="feed-container">
                {this.props.data.user.comments.map((comment) =>
                  <span>
                    <span> <h4>On: {moment(comment.createdAt).format("MMM Do YY")}</h4></span>
                    <PostPreview key={comment.id} post={comment.post} />
                  </span>
                )}
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}
