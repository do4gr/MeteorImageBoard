import React from 'react'

export default class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  render () {
    return (
      <div className='pa2 bg-black-05 ma2'>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.post.postedFile.url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
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
