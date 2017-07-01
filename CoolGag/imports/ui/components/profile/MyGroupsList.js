import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
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
      modal: false,
      isAdmin: false,
    };
    this.checkAdmin = this.checkAdmin.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  checkAdmin = () =>{
    // const userId = this.props.data.user.id;
    // const adminId = this.props.data.admin.id;
    // if( adminId === userId){
    //     this.setState({
    //       isAdmin: true
    //   });
    // }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleDeletion = () => {
    // const userId = this.props.data.user.id;
    // const adminId = this.props.data.admin.id;
    // if( adminId === userId){

    // }
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
            <Col xs="12" sm="6" md="8">
              <div className="group-list-group-title">
                <Link to={`/group/${this.props.group.id}`}>
                    {this.props.group.name}
                </Link>
              </div>
            </Col>
            <Col xs="12"  sm="6" md="4">
                <Button color="warning" onClick={this.handleLeaving}>Leave</Button>{" "}
              {/*
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                  <ModalHeader toggle={this.toggle}>Leave this Group</ModalHeader>
                  <ModalBody>
                  Hey &nbsp;{ this.props.data.user }&nbsp;, are you sure you want to leave {this.props.group.name}?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.handleLeaving}>Leave</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              */}
              { this.props.data.user.id === this.props.group.admin.id &&
                <Button color="danger"><Glyphicon glyph="trash" onClick={this.handleDeletion} /></Button>
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
            admin { id }
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
