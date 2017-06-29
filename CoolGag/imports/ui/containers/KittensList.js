import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const KittenQuery = gql`query {
  allPosts(orderBy: createdAt_DESC
  filter: {category: KITTENS}) {
    id
    user {id,name }
	  postedFile { id, url }
    description
	  category
    karmaPoints
  }
}`

export default graphql(KittenQuery)(ListPage);
