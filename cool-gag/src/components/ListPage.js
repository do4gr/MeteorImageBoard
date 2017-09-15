import React from 'react'
import PostPreview from '../components/PostPreview'
import PostPreviewAdmin from '../components/PostPreviewAdmin'

import {gql, graphql} from 'react-apollo'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';

export default class ListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }
    return (
      <div>
        <Container className="nested">
          <Row>
            <Col sm="12" md={{
              size: 10,
              offset: 1
            }} lg={{
              size: 8,
              offset: 2
            }} xl={{
              size: 7,
              offset: 2.5
            }} className="feed-container">
              {this.props.data.allPosts.map((post) => {
                if ((post && post.user.id === this.props.data.user.id) || this.props.data.user.isAdmin) {
                  return (<PostPreviewAdmin key={post.id} post={post}/>);
                } else {
                  return (<PostPreview key={post.id} post={post}/>);
                }
              })}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
