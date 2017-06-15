import React from 'react'
import PostPreview from '../PostPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

export default class UpvoteListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.user.upvotedPosts.map((post) =>
            <PostPreview key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}
