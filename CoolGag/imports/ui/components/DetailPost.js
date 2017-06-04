import React from 'react'
import { Button } from 'reactstrap';

export default class DetailPost extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  render () {
    return (
      <div className="pa1 bg-black-05 ma3">
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
          {"Description: " + this.props.post.description}&nbsp;
        </div>
        <div className='pt3'>
          {"Category: " + this.props.post.category}&nbsp;
        </div>
        <div className='pt3'>
          {"Votes: " + this.props.post.upvotes}&nbsp;
        </div>
        <div className='pt3'>
        <p><b>Comments: </b></p>
        </div>
        <div className="pt3">
        <input type="text"></input>	        </div>
        <div className="pt3">
          <button>{"Add Comment"}</button>
        </div>
      </div>
    )
  }
}
