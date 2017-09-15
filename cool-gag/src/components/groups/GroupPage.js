import React from 'react'
import {compose, fetchPolicy, gql, graphql, withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import {Button, Col, Container, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row,} from 'reactstrap'
import {Link, withRouter} from 'react-router'
import GroupMembers from './GroupMembers'
// import GroupPosts from './groups/GroupPosts'
import {GroupPostsQuery} from '../../containers/groupQueries/GroupPostsQuery'
import PostPreview from '../PostPreview'

class GroupPage extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render() {
    console.log(this.props)
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return <div>An unexpected error occurred</div>
    }
    return (
      <div>
        <Container>
          <Row>
            <Col
              xs="12"
              sm={{ size: 10, offset: 1 }}
              lg={{ size: 9, offset: 1.5 }}
            >
              <div className="text-center group-title">
                {this.props.data.Group.name}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="11" lg="10">
              <div className="pull-right">
                <Link to={`/createPost/${this.props.data.Group.id}`}>
                  <Button color="info">+&nbsp;Post</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs="12"
              sm="6"
              md={{ size: 2, offset: 1 }}
              lg={{ size: 2.5, offset: 1.5 }}
            >
              <div className="heading2">Members</div>
              {this.props.data.Group.users.map(groupUser => (
                <GroupMembers
                  key={groupUser.id}
                  groupUser={groupUser}
                  data={this.props.data}
                  handleCancel={this.goBack}
                />
              ))}
            </Col>

            <Col
              xs="12"
              sm={{ size: 10, offset: 1 }}
              md={{ size: 7, offset: 1 }}
              lg={{ size: 6, offset: 1.5 }}
              className="feed-container"
            >
              {this.props.data.Group.posts.map(post => (
                <PostPreview
                  key={post.id}
                  post={post}
                  handleCancel={this.goBack}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  goBack = () => {
    this.props.router.replace('/mygroups/')
  }
}

const userQuery = gql`
  query {
    authenticatedUser {
      id
    }
  }
`

const GroupPageWithData = compose(
  graphql(userQuery, (fetchPolicy: 'network-only')),
  graphql(GroupPostsQuery, {
    options: ownProps => ({
      variables: {
        groupId: ownProps.params.groupId,
      },
    }),
  }),
)(withApollo(withRouter(GroupPage)))

export default GroupPageWithData
