import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const FreshQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
    user {id,name }
	  postedFile { id, url }
    description
	  category
  }
}`

export default graphql(FreshQuery)(ListPage);
