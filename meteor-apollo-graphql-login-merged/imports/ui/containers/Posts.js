import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Posts from '../components/Posts';

const posts = gql`
  {
    allPosts {
      id
      title
      description
      read
    }
  }
`;

export default graphql(posts, {
  options: {
    pollInterval: 10000,
  },
})(Posts);
