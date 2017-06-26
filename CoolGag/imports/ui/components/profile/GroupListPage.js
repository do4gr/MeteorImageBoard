import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import MyGroups from '/imports/ui/components/profile/MyGroupsList'
import { Button,Label } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';

export default class GroupListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

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
      <div className='group-list-container'>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
              <div className="group-header-wrapper">
                <div className="groups-title">My Groups</div>
              </div>
               <hr/>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }} className="group-listing">
              {this.props.data.user.groups.map((group) =>
              //<PostPreview key={post.id} post={post} />
              <MyGroups key={group.id} group={group} data={this.props.data} />
              )}
            </Col>
          </Row>
         </Container>
      </div>
    )
  }
}
