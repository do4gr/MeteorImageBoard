import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap';

export default class ProfilePostListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    let myParameter = null
    if (this.props.data.user){
      myParameter = this.props.data.user
         }
    else {

      myParameter = this.props.data.User

    }

    return (
        <div>
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }} className="feed-container">


                    {myParameter.posts.map((post) =>
                        <PostPreview key={post.id} post={post} />
                    )}

                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
}
