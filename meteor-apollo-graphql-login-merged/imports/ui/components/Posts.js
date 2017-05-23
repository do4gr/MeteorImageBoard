import React from 'react';
import BooksList from './PostsList';
import PropTypes from 'prop-types';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Posts">
        <h4>Posts</h4>
        <PostsList posts={ _.where(data.allPosts, { read: true }) }/>
      </div>
  );
  }
  
}
