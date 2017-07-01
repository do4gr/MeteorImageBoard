import React from 'react'
import { withRouter } from 'react-router'
import { gql, graphql } from 'react-apollo'
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
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }} className="singlepost-container" >
                <DetailPost post={this.props.data.Post} user={this.props.data.user} handleCancel={this.goBack}/>
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

export const PostQuery = gql`query PostQuery($postId: ID!){
  Post (id: $postId){
    id
    category
    upvotes
    karmaPoints
    comments(orderBy: createdAt_DESC){
      id
      text
      user{
        id
        name
        profilePic { id, url }
      }
    }
    postedFile { id, url }
    description
    user{ id, name }
  }
  user {id,name}
}`


const PostPageWithData = graphql(PostQuery, {
  options: (ownProps) => ({
      variables: {
        postId: ownProps.params.postId
      }
    })
  }
)(withRouter(PostPage))

export default PostPageWithData
