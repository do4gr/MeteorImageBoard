import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DetailPost from './DetailPost'
import {Container, Row, Col} from 'reactstrap';

class PostPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Post: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div className=' flex justify-center'>
        <Container>
          <Row>
            <Col>
              <div className="singlepost-container">
                <DetailPost post={this.props.data.Post} user={this.props.data.user} handleCancel={this.goBack}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const PostQuery = gql`query PostQuery($id: ID!){
  Post (id: $id){
    id
    category
    upvotes
    comments(orderBy: createdAt_DESC){
      id
      text
      user{
        id
        name
        profilePic { url }
      }
    }
    postedFile { url }
      description
      user{ name }
    }
    user {
      id 
      name
    }
}`


const PostPageWithData = graphql(PostQuery, {
  options: (ownProps) => ({
      variables: {
        id: ownProps.params.postId

      }
    })
  }
)(withRouter(PostPage))

export default PostPageWithData
