import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo'
import { Button, ButtonGroup,  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import {Container, Row, Col} from 'reactstrap';
import ProfilePostListPage from '../components/profile/ProfilePostListPage';
import { MyGroupsQuery } from './groups/MyGroupsList';



class PublicProfile extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Post: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    userQuery: React.PropTypes.object.isRequired,
  }

  state = {
    groupId: '' ,
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  isSubmittable() {
    return this.state.group
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    console.log(this.props)

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    let points = 0
    if (this.props.data.User.posts){
    {this.props.data.User.posts.map((post) =>
      points = points + post.karmaPoints
    )}

    }
    if (this.props.data.User.downvotedPosts){
      {this.props.data.User.downvotedPosts.map((post) =>
        points = points + 2
      )}
    }
    if (this.props.data.User.upvotedPosts){
      {this.props.data.User.upvotedPosts.map((post) =>
        points = points + 2
      )}
    }
    if (this.props.data.User.comments){
      {this.props.data.User.comments.map((comment) =>
        points = points + 5
      )}
    }

    return (
      <div >
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
              <h1 className="profileName center-text"> {this.props.data.User.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm="9" md={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 3 }}>
              {this.props.data.User.profilePic && this.props.data.User.profilePic.url &&
                <div className="profilePic center-block">
                  <img src={this.props.data.User.profilePic.url} crossOrigin='Anonymous' role='presentation' className='w-80 profilePic'/>
                </div>
              }
            </Col>
            <Col sm="3" md={{ size: 3, offset: 1 }} lg={{ size: 2, offset: 1 }}>
              <div className="pull-right">
                <Button color="info" onClick={ this.toggle }>+&nbsp;Invite to Group</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Add {this.props.data.User.name} to Group</ModalHeader>
                  <ModalBody className="text-center">
                    <form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Label for="groupSelect">Select the Group you want {this.props.data.User.name} to join:</Label>
                        <Input type="select" name="select" id="groupSelect"
                          value={this.state.groupId}
                          onChange={(e) => this.setState({groupId: e.target.value})}>
                          <option></option>
                          { this.props.userQuery.user.groups.map((group) =>
                            <option  key={ group.id } value={ group.id }> { group.name } </option>
                          )}
                        </Input>
                      </FormGroup>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary"  onClick={this.toggle} onClick={this.addToGroup.bind(this)}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
              <div className="center-text">
                Member since {this.props.data.User.createdAt.split("T")[0].split("-")[2]}.{this.props.data.User.createdAt.split("T")[0].split("-")[1]}.{this.props.data.User.createdAt.split("T")[0].split("-")[0]}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
              <div className="center-text" >
                Karma: {points}
              </div>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col>
              <div className="paddingTopPage">
                <ProfilePostListPage data={this.props.data}/>
              </div>
              <hr/>
            </Col>
          </Row>
        </Container>
      </div>
  )};

  goBack = () => {
    this.props.router.replace('/')
  }

  addToGroup = (event) => {
    const { groupId } = this.state
    const userId = this.props.data.User.id;

    console.log(userId, this.props)

    this.props.addUserToGroup({
      variables: {userId, groupId }
    })
    .then(({ data }) => {
          this.goBack()
      })
    .catch(error => {
      console.log("there was an error sending the query", error);
    });
  }
}


const addUserToGroup = gql`
  mutation addToGroup($groupId:ID!, $userId:ID!){
   addToUserOnGroup(
      groupsGroupId: $groupId,
      usersUserId: $userId,
    ){
      groupsGroup {
        id
      }
    }
  }
`

export const PublicPostsQuery = gql`query PublicPostsQuery($userId: ID!){
  User (id: $userId){
    id
    name
    createdAt
    karma
    downvotedPosts{ id }
    upvotedPosts{ id }
    comments { id }
    profilePic {
      id
      url
    }
    posts(orderBy: createdAt_DESC) {
      id
      user {id,name }
      postedFile { id, url }
      description
      karmaPoints
      youtubeID
    }
  }
}`

const userQuery = gql` query userQuery{
  user {
    id
    name
    groups { id, name }
  }
}`

const PublicPostsWithData = compose(
  graphql(userQuery, {fetchPolicy : 'network-only', name: 'userQuery' }),
  graphql(addUserToGroup, { name: "addUserToGroup" }),
  graphql(PublicPostsQuery, {
    options: (ownProps) => ({
        variables: {
          userId: ownProps.params.userId
        }
      })
    }
)
)(withRouter(PublicProfile))

export default PublicPostsWithData
