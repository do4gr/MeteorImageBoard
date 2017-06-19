import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button, Label} from 'reactstrap'

export default class MyGroups extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    console.log(this.props)
    // if (this.props.data.loading) {
    //   return (<div>Loading</div>)
    // }

    return (
      <div className='group-list-container'>

        <div className="group-list-item-wrapper">
        {//link to the special group site with showing Members, inviting Members, create Group, GroupPosts
        }

          <div className="group-list-group-title">{this.props.group.name}</div>

         <div className="group-list-btn-plusMembers">
          <Button color="secondary">Add Members</Button>
         </div>
         <div className="group-list-btn-leaveGroup">
          <Button color="danger">Leave Group</Button>
         </div>

       {/*
          <div>
            <b>Members</b>
              <div>
                {this.props.group.users.map((groupUser) =>
                  <div> {groupUser.name},  </div>
                )}
              </div>
          </div>
          */}
        </div>
      </div>
    )
  }
}
