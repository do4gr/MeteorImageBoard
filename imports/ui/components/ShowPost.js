import React from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class ShowPost extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>



    )
  }

  }

  export default ShowPost
