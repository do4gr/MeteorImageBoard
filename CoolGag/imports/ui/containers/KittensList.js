import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const KittenQuery = gql`query {
  allPosts(orderBy: createdAt_DESC
  filter: {category: KITTENS}) {
    id
	postedFile { url }
    description
	category
  }
}`

export default graphql(KittenQuery)(ListPage);
