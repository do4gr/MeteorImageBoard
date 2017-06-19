import {gql,  graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const TrendingQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { id, url }
    description
	category
  }
}`

export default graphql(TrendingQuery)(ListPage);
