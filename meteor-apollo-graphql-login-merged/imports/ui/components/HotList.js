import React from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Nav from './Nav'


class HotList extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div className='w-100 flex justify-center'>
        <Nav />
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allPosts.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

//hot definition? as filter
const HotQuery = gql`query {
  allPosts(orderBy: createdAt_DESC
  filter: {category: KITTENS}) {
    id
    imageUrl
    description
  }
}`

export default graphql(HotQuery)(HotList)
