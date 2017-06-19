import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const HotQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { url }
    description
	category
  }
}`

export default graphql(HotQuery)(ListPage);
