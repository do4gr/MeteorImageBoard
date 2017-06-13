import React from 'react'
import Post from './Post'
import DetailPost from './DetailPost'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


 class ShowPost extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    } else if (this.props.data.error) {
      return (<div>{this.props.data.error.message}</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
        {this.props.data.allPosts.map((post) =>
          {
            if (post.id == this.props.params.id){
              return (<DetailPost key={post.id} post={post} />) //this is incredibly inefficient. we should only fetch the one post we need
            }
      }
        )}
        </div>
      </div>
    )
  }
  }

  const detailQuery = gql`query {
    allPosts{
      id
      category
      upvotes
      comments{
      	id
      	text
      	user{
      		id
      		name
      		profilePic {
            url
          }
      	}
      }
    postedFile { url }
      description
      user{
        name
      }
    }
    user {
      id
      name
    }
  }`

  export default graphql(detailQuery)(ShowPost);
