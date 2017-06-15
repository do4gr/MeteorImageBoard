import React from 'react'
import PostPreview from '../PostPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

export default class GroupListPage extends React.Component {

  Profile  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
        {this.props.data.user.groups.map((group) =>
         //<PostPreview key={post.id} post={post} />
         <span>
              <span> <h4>Group: {group.name}, with users: </h4></span>
              <span> {group.users.map((groupUser) =>
                  <span> {groupUser.name},  </span>
              )} </span>
          </span>
        )}
        </div>
      </div>
    )
  }
}

