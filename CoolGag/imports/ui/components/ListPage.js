import React from 'react'
import PostPreview from '../components/PostPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';

export default class ListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className="list-container">
      <Container>
            <Row> 
              <Col>      
                {this.props.data.allPosts.map((post) =>
                  <PostPreview key={post.id} post={post} />
                )}
              </Col>
            </Row>
      </Container>
      </div>
    )
  }
}
