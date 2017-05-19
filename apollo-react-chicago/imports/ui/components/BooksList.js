import React from 'react';
import PropTypes from 'prop-types';

export default BooksList = (props) => (
  <div id={`${props.type}-books`} className={`BooksList ${props.isActive}`}>
    <ul className="books">
      {props.books.map((book) => {
        return (<li key={ book.title } className="book">
          <strong>{ book.title }</strong> by { book.author }
        </li>);
      })}
    </ul>
  </div>
);
