import React from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ShowPost from '../components/ShowPost';


export default class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <a href={"../showpost/#" + this.props.post.id}>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.post.postedFile.url})`,
			backgroundPosition: 'center center',
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        /></a>
        <div className='pt3'>
          {this.props.post.description}&nbsp;
        </div>
        <div className='pt3'>
          {this.props.post.category}&nbsp;
        </div>
        <div className='pt3'>
        {this.props.post.id}&nbsp;
        </div>

      </div>
    )
  }
}
