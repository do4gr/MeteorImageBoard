import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Media} from 'reactstrap'
import { Glyphicon } from 'react-bootstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';
// import {MyGroupsQuery} from '/imports/ui/containers/profileLists/MyGroupsQuery'


class MyGroupsList extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      group: React.PropTypes.object,
      user: React.PropTypes.object,
    }).isRequired
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

  handleDeletion = () => {
    const groupId = this.props.group.id;
    this.props.deleteGroup({
        mutation: deleteGroup,
        variables: { groupId },
        refetchQueries: [{
              query: MyGroupsQuery,
              // variables: { id: postId }
            }],
      })
      .then(({ data }) => {
        //console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  handleLeaving = () => {
  const groupId = this.props.group.id;
  const userId = this.props.data.user.id;
  this.props.userLeavesGroup({
      variables: { groupId, userId },
      refetchQueries: [{
            query: MyGroupsQuery,
          }],
    })
    .then(({ data }) => {
      //console.log("got data", data);
    })
    .catch(error => {
      console.log("there was an error sending the query", error);
    });
};


  render () {
    console.log(this.props)
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <Container className="nested group-listing">
          <Row>
            <Col xs="3" sm="2" md="2" lg="1">
              <div className="imgHolder align-item" >
                  <img  className="img-rounded imgHolder" src={`${this.props.group.picFile? this.props.group.picFile.url : '/images/ProfileDummy.png'}`} alt="Generic placeholder image" />
              </div>
            </Col>
            <Col xs="9" sm="4" md="6" lg="7" className="align-item">
              <div className="group-list-group-title">
                <Link to={`/group/${this.props.group.id}`}>
                    {this.props.group.name}
                </Link>
              </div>
            </Col>
            <Col xs="12"  sm="6" md="4" lg="4">
                <Button color="warning" onClick={this.toggle}>Leave</Button>{" "}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Leave Group</ModalHeader>
                  <ModalBody className="text-center">
                    Are you sure that you want to leave the group "{ this.props.group.name }"?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle} onClick={this.handleLeaving}>Leave</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              { this.props.data.user.id === this.props.group.admins.id &&
                <span>
                  <Button color="danger" onClick={this.toggle}><Glyphicon glyph="trash"/></Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Group</ModalHeader>
                    <ModalBody className="text-center">
                      Are you sure that you want to delete the group "{ this.props.group.name }"?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle} onClick={this.handleDeletion}>Delete</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                  </span>
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const MyGroupsQuery = gql`query {
    user{
        id
        name
        groups (orderBy: createdAt_DESC){
            id
            name
            admins { id }
            createdAt
            updatedAt
            users{id,name}
            posts{
                id
                postedFile { id, url }
                description
            }
        }
    }
}`

const deleteGroup = gql`
  mutation deleteGroup($groupId: ID!) {
      deleteGroup( id: $groupId) {
            id
            name
      }
}`;

const userLeavesGroup = gql`
  mutation userLeavesGroup( $userId: ID!, $groupId: ID!) {
    removeFromUserOnGroup( groupsGroupId: $groupId, usersUserId: $userId) {
      usersUser{ id, name },
      groupsGroup { id, name }
    }
}`;


export default compose(
  graphql(MyGroupsQuery),
  graphql(deleteGroup, { name: "deleteGroup" }),
  graphql(userLeavesGroup, { name: "userLeavesGroup"})
)(MyGroupsList);
