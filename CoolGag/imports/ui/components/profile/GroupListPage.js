import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import MyGroups from '/imports/ui/components/profile/MyGroups'
import { Button,Label } from 'reactstrap'


export default class GroupListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    console.log(this.props)
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='group-list-container'>
        <div >
          <div className="group-header-wrapper">
            <div className="groups-title">My Groups</div>
            <div className="create-group-btn"><Button color="info">Create Group</Button></div>
          </div>
          <div>
            <hr/>

              {this.props.data.user.groups.map((group) =>
              //<PostPreview key={post.id} post={post} />
              <MyGroups key={group.id} group={group} />
              )}
          </div>
        </div>
      </div>
    )
  }
}
