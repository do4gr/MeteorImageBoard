import React from 'react'
import PostPreview from '../PostPreview'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';

export default class UpvoteListPage extends React.Component {

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
                        {this.props.data.user.upvotedPosts.map((post) =>
                            <PostPreview key={post.id} post={post} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}
