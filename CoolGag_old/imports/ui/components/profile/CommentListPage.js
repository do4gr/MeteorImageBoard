import React from 'react'
import PostPreview from '../PostPreview'
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

    //console.log(this.props)
    return (
        <div>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }} className="feed-container">
                {this.props.data.user.comments.map((comment) =>
                  //maybe insert commentdate again once the comments work again
                  <PostPreview key={comment.post.id} post={comment.post} />

                )}
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}
