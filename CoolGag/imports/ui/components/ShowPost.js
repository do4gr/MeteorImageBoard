import React from 'react'
import Post from './Post'
import DetailPost from './DetailPost'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


export default class ShowPost extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
        {this.props.data.allPosts.map((post) =>
          <DetailPost key={post.id} post={post} />
        )}
        </div>
      </div>
    )
  }

  }
