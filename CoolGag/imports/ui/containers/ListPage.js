import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const FeedQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
    user { name }
	postedFile { url }
    description
	category
  }
}`

export default graphql(FeedQuery)(ListPage);
