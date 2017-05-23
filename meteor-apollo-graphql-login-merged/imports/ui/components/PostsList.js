import React from 'react';
import PropTypes from 'prop-types';

export default PostsList = (props) => (
  <div id={`${props.type}-posts`} className={`PostsList`}>
    <ul className="posts">
      {props.posts.map((post) => {
        return (<li key={ post.title } className="post">
          <strong>{ post.title }</strong> by { post.description }
        </li>);
      })}
    </ul>
  </div>
);
