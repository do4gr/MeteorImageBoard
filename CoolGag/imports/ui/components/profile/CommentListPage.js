import React from 'react'
import PostPreview from '../PostPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

export default class CommentListPage extends React.Component {

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
        {this.props.data.user.comments.map((comment) =>
         //<PostPreview key={post.id} post={post} />
         <span>
              <span> <h4>Am: {comment.createdAt} hast du geschrieben {comment.text}</h4></span>

          </span>
        )}
        </div>
      </div>
    )
  }
}
