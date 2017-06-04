import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const FeedQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { url }
    description
  }
}`

export default graphql(FeedQuery)(ListPage);
