import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'


export default class PostPreview extends React.Component {

  static propTypes = {
    post: PropTypes.object,
  }

  render () {
    return (
      <div className='pa2 bg-black-05 ma2'>
      <Link to={`view/${this.props.post.id}`}>
           <div
             className='w-100'
             style={{
               backgroundImage: `url(${this.props.post.postedFile.url})`,
               backgroundPosition: 'center center',
               backgroundSize: 'cover',
               paddingBottom: '100%'
             }}
           />
         </Link>
        <div className='pt3'>
          {this.props.post.description}&nbsp;
        </div>
        <div className='pt3'>
          {this.props.post.category}&nbsp;
        </div>
      </div>
    )
  }
}
