import React from 'react'
import PropTypes from 'prop-types'
import MyGroupsList from './MyGroupsList'
import {Button, Col, Container, Label, Row} from 'reactstrap'

export default class GroupListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
  //  console.log(this.props)
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div className=''>
        <Container className="nested">
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} xl={{ size: 10, offset: 1 }}>
              <div className="group-header-wrapper">
                <div className="groups-title">My Groups</div>
              </div>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 10, offset: 1 }} xl={{ size: 10, offset: 1 }} className="group-listing">
              {this.props.data.user.groups.map((group) =>
              //<PostPreview key={post.id} post={post} />
              <MyGroupsList key={group.id} group={group} data={this.props.data}/>
              )}
            </Col>
          </Row>
         </Container>
      </div>
    )
  }
}
