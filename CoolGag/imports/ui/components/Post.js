import React from 'react'
import PropTypes from 'prop-types'

export default class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
  }

  render () {
    return (
      <div className='pa2 bg-black-05 ma2'>
        <div className='pb3'>{this.props.post.description}</div>
        <img src={this.props.post.postedFile.url}
          className='w-100'
        />
				{ this.props.post.category &&
					<div className='pt3'>
						{this.props.post.category}&nbsp;
					</div>
				}
      </div>
    )
  }
}
